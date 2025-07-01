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
		}),
	);

	const getTask = (id: UniqueIdentifier) => tasks.find((task) => task.id === id);

	const getTasksByStatus = (status: Task['status']) =>
		tasks.filter((task) => task.status === status);

	const handleDragStart = (event: DragStartEvent) => {
    console.log({event});
    
		setActiveId(event.active.id);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
    console.log({active, over});
    

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
		const activeContainer =
			active.data.current?.sortable?.containerId ||
			(active.data.current?.status ? `empty-${active.data.current.status}` : null);

		let overContainer =
			over.data.current?.sortable?.containerId ||
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
				status: status, // Make sure this is set
			},
		});

		return (
			<div
				ref={setNodeRef}
				className={`mb-2 h-0 rounded-lg opacity-0 transition-colors ${
					isOver
						? 'border-2 border-blue-400 bg-blue-100'
						: 'border-2 border-dashed border-gray-300'
				}`}
			/>
		);
	};

	const activeTask = activeId ? getTask(activeId) : null;

	return (
		<div className='min-h-screen bg-gray-100 p-6'>
			<h1 className='mb-8 text-3xl font-bold text-gray-800'>Kanban Board</h1>

			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCorners}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}>
					{columns.map((column) => {
						const columnTasks = getTasksByStatus(column.id);
						return (
							<div
								key={column.id}
								className='min-h-[200px] rounded-lg bg-gray-200 p-4'>
								<h2 className='mb-4 text-xl font-semibold text-gray-700'>
									{column.title}
								</h2>
								<div className='space-y-3'>
									<SortableContext
										id={column.id}
										items={columnTasks.map((task) => task.id)}
										strategy={verticalListSortingStrategy}>
										{/* Always render empty drop zone at the top */}
										<EmptyDropZone status={column.id} />

										{columnTasks.map((task) => (
											<SortableItem key={task.id} id={task.id}>
												<div className='rounded bg-white p-3 shadow transition-shadow hover:shadow-md'>
													<h3 className='font-medium text-gray-800'>
														{task.title}
													</h3>
													<p className='mt-1 text-sm text-gray-600'>
														{task.description}
													</p>
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
								<div className='w-[250px] rounded border border-blue-300 bg-white p-3 shadow-lg'>
									<h3 className='font-medium text-gray-800'>
										{activeTask.title}
									</h3>
									<p className='mt-1 text-sm text-gray-600'>
										{activeTask.description}
									</p>
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
