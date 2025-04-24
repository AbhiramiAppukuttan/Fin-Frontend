import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { viewNotificationAPI, updateNotificationAPI, markAllAsReadAPI, markAsReadAPI } from "../../services/notificationServices";

const NotificationPage = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();

  // Fetch notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: viewNotificationAPI,
    refetchInterval: 5000,
    onSuccess: (newData) => {
    // Optional: Compare newData with old notifications length, show toast
  },
  });

  // Count unread notifications
  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  // Mutation for marking a single notification as read
  const markAsReadMutation = useMutation({
    mutationFn: async (id) => {
        console.log("Marking notification as read:", id);
        await markAsReadAPI(id); // Pass the ID here
        queryClient.invalidateQueries(["notifications"]);
    },
  });
  
  



  // Mutation for marking all notifications as read
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      await markAllAsReadAPI();
      queryClient.refetchQueries(["notifications"]);

    },
  });

  return (
    <div className={`fixed top-0 right-0 w-96 h-full bg-gray-900 shadow-2xl p-6 z-50 flex flex-col transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-yellow-400">Notifications ({unreadCount})</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="mt-4 space-y-4 flex-1 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div key={notif._id} className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400 font-semibold">
                  {new Date(notif.date).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center mt-2">
                {notif.type === "success" && <CheckCircle className="text-green-400 h-5 w-5 mr-3" />}
                {notif.type === "error" && <AlertCircle className="text-red-400 h-5 w-5 mr-3" />}
                {notif.type === "info" && <Info className="text-blue-400 h-5 w-5 mr-3" />}
                <p className="text-sm font-medium text-gray-200">{notif.message}</p>
              </div>
              <button onClick={() => markAsReadMutation.mutate(notif._id)} className="text-blue-400 text-xs font-semibold hover:underline mt-2 block">
                Mark as Read
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center mt-10">No new notifications</p>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="mt-6">
          <button onClick={() => markAllAsReadMutation.mutate()} className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
            Mark All as Read
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
