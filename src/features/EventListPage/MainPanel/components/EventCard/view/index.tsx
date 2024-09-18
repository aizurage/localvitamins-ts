import { useState, useEffect, FC } from "react";
import styles from "./index.module.css";
import { Dayjs } from "dayjs";
import { EventTextDescriptionPanel } from "../EventTextDescriptionPanel";
import { EventOwnerOptionPanel } from "../EventOwnerOptionPanel/view";
import { downloadEventImage } from "../controller/downloadEventImage";
import { EventButtonPanel } from "../EventButtonPanel";
import { EventImagePanel } from "../EventImagePanel";
import { supabase } from "../../../../../../supabaseClient";

interface Props {
  eventId: number;
  eventPictureUrl: string;
  title: string;
  date: Dayjs;
  description: string;
  plannerUniqueId: string;
}

export const EventCard: FC<Props> = ({
  eventId,
  eventPictureUrl,
  title,
  date,
  description,
  plannerUniqueId,
}) => {
  const [eventPictureObjectUrl, setEventPictureObjectUrl] = useState("");
  useEffect(() => {
    (async () => {
      const fetchedObjectUrl = await downloadEventImage(eventPictureUrl);
      setEventPictureObjectUrl(fetchedObjectUrl);
    })();
  }, [eventPictureUrl]);

  return (
    <div className={styles.card} key={eventId}>
      <EventImagePanel objectUrl={eventPictureObjectUrl} alt={title} />
      <EventTextDescriptionPanel
        title={title}
        date={date}
        description={description}
      />
      <EventButtonPanel
        eventId={eventId}
        title={title}
        date={date}
        open={() => {}}
      />
      <div>
        {supabase.auth.getUser().id === plannerUniqueId && (
          <EventOwnerOptionPanel eventId={eventId} />
        )}
      </div>
    </div>
  );
};
