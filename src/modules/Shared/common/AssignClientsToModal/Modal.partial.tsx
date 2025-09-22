import { useEffect } from "react";
import Search from "../Search.partial";
import Button from "../../../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import Pagination from "../../../../components/ui/Pagination";
import PageLoader from "../../../../templates/layouts/main/PageLoader";
import { AssignClientModalListItemPartial } from "./ModalListItem.partial";
import {
  getAgencyClientsWithJobs,
  getAssignedClientForTeam,
  getPaginatedAgencyClientsList,
  setClientSearch,
} from "../../../../store/slices/Client.slice";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalFooterChild,
  ModalHeader,
} from "../../../../components/ui/Modal";
import { useAuth } from "../../../../context/authContext";
import { Roles } from "../../../../constants/role.enums";

export const AssignClientsToJobModalPartial = ({
  modal,
  setModal,
  title = "Assign Client to Candiate",
  assignTo,
  assignedId,
}: {
  title?: string;
  modal: boolean;
  setModal: any;
  assignTo: string;
  assignedId: string;
}) => {
  const { userStorage } = useAuth();
  const isTeamRole = userStorage?.role === Roles.TEAM;
  const { paginationCount, pageLoading, error, paginatedClients } = useSelector(
    (state: RootState) => state.clients,
  );

  return (
    <Modal isScrollable={true} isCentered isOpen={modal} setIsOpen={setModal}>
      <ModalHeader>{title}</ModalHeader>
      <div className="p-4">
        <Search
          searchLimit={10}
          setSearchActionForPagination={setClientSearch}
          searchListAction={
            isTeamRole
              ? getAssignedClientForTeam
              : getPaginatedAgencyClientsList
          }
          placeholder="Search Client..."
        />
      </div>
      <ModalBody className="flex h-96 w-full flex-col gap-4 overflow-y-scroll">
        <PageLoader data={paginatedClients} loading={pageLoading} error={error}>
          {paginatedClients.map((client: any) => (
            <AssignClientModalListItemPartial assignedId={assignedId} assignTo={assignTo} item={client} key={client.id} />
          ))}
        </PageLoader>
      </ModalBody>
      <ModalFooter className="flex-col !items-end">
        <ModalFooterChild>
          <Pagination
            count={paginationCount}
            limit={10}
            getListAction={
              isTeamRole
                ? getAssignedClientForTeam
                : getPaginatedAgencyClientsList
            }
          />
        </ModalFooterChild>
        <ModalFooterChild className="w-full">
          <Button
            onClick={() => setModal(false)}
            className="w-full"
            variant="outline"
            color="zinc"
          >
            Cancel
          </Button>
          <Button
            onClick={() => setModal(false)}
            className="w-full"
            variant="solid"
          >
            Done
          </Button>
        </ModalFooterChild>
      </ModalFooter>
    </Modal>
  );
};
