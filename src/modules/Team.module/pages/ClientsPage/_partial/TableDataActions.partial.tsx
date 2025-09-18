import { useState } from "react";
import Button from "../../../../../components/ui/Button";
import { ClientListItemType } from "../../../../../types/slices.type/clients.slice.type";
import {
  assignJobToClient,
  deleteClientClient,
  getPaginatedAgencyClientsList,
  unAssignJobToClient,
} from "../../../../../store/slices/Client.slice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { ConfirmationModal } from "../../../../Shared/components/CustomModal/confirmationModal";

const TableDataActionsPartial = ({
  client,
}: {
  client: ClientListItemType;
}) => {
  return (
    <div className="no-scrollbar justify-center flex overflow-x-scroll text-nowrap">
      {/* <Link to={`/dashboard/clients/jobs`} state={client}>
        <Button color="blue">View Jobs</Button>
      </Link> */}

      <Link
        to={`/dashboard/chat/${client.id}`}
        state={{ userName: client.name, userId: client.id }}
      >
        <Button color="blue">Message</Button>
      </Link>
    </div>
  );
};

export default TableDataActionsPartial;
