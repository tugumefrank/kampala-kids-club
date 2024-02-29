import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startTransition, useState } from "react";

type EventTypeDropdownProps = {
  value?: string;
  onChangeHandler?: (value: string) => void;
};

const EventTypeDropdown = ({ value, onChangeHandler }: EventTypeDropdownProps) => {
  const eventTypes = ["Online Event", "Physical Event"];
  const [newEventType, setNewEventType] = useState("");

  const handleAddEventType = () => {
    // Assuming you won't allow users to add their own event types
    // If adding is allowed, you can implement the logic accordingly
    console.error("Adding new event types is not allowed");
  };

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Event Type" />
      </SelectTrigger>
      <SelectContent>
        {eventTypes.map((eventType, index) => (
          <SelectItem
            key={index}
            value={eventType}
            className="select-item p-regular-14"
          >
            {eventType}
          </SelectItem>
        ))}
        {/* Add new event type is not allowed for now, you can customize this part */}
      </SelectContent>
    </Select>
  );
};

export default EventTypeDropdown;
