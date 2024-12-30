'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteSubAccount } from "@/lib/queries";
import { MessageConfiguration, PING_DISPATCH } from "@/Events/MessageDispatcher";

type SubAccountActionProps = {
  subaccountId: string;
};

const SubAccountActions = ({ subaccountId }: SubAccountActionProps) => {
  const handleDelete = async () => {
    try {
      await deleteSubAccount(subaccountId);
      alert("Subaccount deleted successfully.");
      PING_DISPATCH("this is Success", "Subaccount deleted successfully.", MessageConfiguration?.SC_M)
      // You may want to revalidate the data or refresh the page
    } catch (error) {
      console.error("Error deleting subaccount:", error);
      alert("Failed to delete the subaccount.");
    }
  };

  return (
    <div className="mt-auto flex justify-between items-center">
      <AlertDialogTrigger asChild>
        <Button
          size={"sm"}
          variant={"destructive"}
          onClick={handleDelete}
          className="text-red-600"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <a
        href={`/subaccount/${subaccountId}`}
        className="text-blue-600 text-sm"
      >
        Manage
      </a>
    </div>
  );
};

export default SubAccountActions;
