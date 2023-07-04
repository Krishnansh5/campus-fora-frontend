import { NotificationPayload } from 'firebase/messaging';
import React from 'react';
import { toast } from 'react-toastify';

function NotificationComponent({
  title,
  body
}: {
  title: string;
  body: string;
}) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
}

export function showNotification(
  notification: NotificationPayload,
  link: string
) {
  toast(
    <NotificationComponent
      title={notification.title}
      body={notification.body}
    />,
    {
      onClick: () => {
        window.open(link, '_blank');
      },
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true
    }
  );
}
