import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { Item } from './Item';

type Task = {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'in_progress' | 'in_review' | 'completed';
};

type Column = {
  id: 'backlog' | 'in_progress' | 'in_review' | 'completed';
  title: string;
};

const columns: Column[] = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'in_review', title: 'In Review' },
  { id: 'completed', title: 'Completed' },
];

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Implement authentication',
    description: 'Set up login and registration flows',
    status: 'backlog',
  },
  {
    id: '2',
    title: 'Design dashboard UI',
    description: 'Create mockups for the main dashboard',
    status: 'backlog',
  },
  {
    id: '3',
    title: 'API integration',
    description: 'Connect frontend to backend APIs',
    status: 'in_progress',
  },
];



const TestPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTask = (id: UniqueIdentifier) => tasks.find((task) => task.id === id);

  const getTasksByStatus = (status: Task['status']) =>
    tasks.filter((task) => task.status === status);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

 const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

  if (!over) {
    setActiveId(null);
    return;
  }

  const activeId = active.id;
  const overId = over.id;

  if (activeId === overId) {
    setActiveId(null);
    return;
  }

  // Determine the source and destination containers
  const activeContainer = active.data.current?.sortable?.containerId || 
                        (active.data.current?.status ? `empty-${active.data.current.status}` : null);
  
  let overContainer = over.data.current?.sortable?.containerId || 
                    (over.data.current?.status ? `empty-${over.data.current.status}` : over.id);

  // Check if we're dropping on an empty zone
  const isOverEmptyZone = typeof overId === 'string' && overId.startsWith('empty-');

  if (isOverEmptyZone) {
    // Extract the status from the empty zone ID
    overContainer = overId.replace('empty-', '') as Task['status'];
  } else if (typeof overContainer === 'string' && overContainer.startsWith('empty-')) {
    overContainer = overContainer.replace('empty-', '') as Task['status'];
  }

  // Find the task being moved
  const activeIndex = tasks.findIndex((t) => t.id === activeId);
  if (activeIndex === -1) {
    setActiveId(null);
    return;
  }

  // Update the task's status if moving between columns
  const activeTask = tasks[activeIndex];
  const currentStatus = activeTask.status;
  
  if (currentStatus !== overContainer) {
    setTasks((tasks) => {
      const updatedTasks = [...tasks];
      updatedTasks[activeIndex] = {
        ...updatedTasks[activeIndex],
        status: overContainer as Task['status'],
      };
      return updatedTasks;
    });
  } else {
    // Reorder within the same column
    const overIndex = tasks.findIndex((t) => t.id === overId);
    if (overIndex !== -1) {
      setTasks((tasks) => arrayMove(tasks, activeIndex, overIndex));
    }
  }

  setActiveId(null);
};

const EmptyDropZone = ({ status }: { status: Task['status'] }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `empty-${status}`,
    data: {
      status: status,  // Make sure this is set
    },
  });


  return (
    <div
      ref={setNodeRef}
      className={`h-0 opacity-0 rounded-lg mb-2 transition-colors ${
        isOver
          ? 'bg-blue-100 border-2 border-blue-400'
          : 'border-2 border-dashed border-gray-300'
      }`}
    />
  );
};


  const activeTask = activeId ? getTask(activeId) : null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Kanban Board</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            return (
              <div key={column.id} className="bg-gray-200 rounded-lg p-4 min-h-[200px]">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  {column.title}
                </h2>
                <div className="space-y-3">
                  <SortableContext
                    id={column.id}
                    items={columnTasks.map((task) => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {/* Always render empty drop zone at the top */}
                    <EmptyDropZone status={column.id} />
                    
                    {columnTasks.map((task) => (
                      <SortableItem key={task.id} id={task.id}>
                        <div className="bg-white p-3 rounded shadow hover:shadow-md transition-shadow">
                          <h3 className="font-medium text-gray-800">{task.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        </div>
                      </SortableItem>
                    ))}
                  </SortableContext>
                </div>
              </div>
            );
          })}

          <DragOverlay>
            {activeTask ? (
              <Item>
                <div className="bg-white p-3 rounded shadow-lg border border-blue-300 w-[250px]">
                  <h3 className="font-medium text-gray-800">{activeTask.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{activeTask.description}</p>
                </div>
              </Item>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default TestPage;