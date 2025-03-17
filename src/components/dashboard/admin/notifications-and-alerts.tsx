import React from 'react';

function NotificationsAndAlerts() {
    const notifications = [
        { id: 1, message: 'Your profile has been updated successfully.' },
        { id: 2, message: 'New message received from Dr. Smith.' },
    ];

    const alerts = [
        { id: 1, message: 'Low oxygen supply in ICU!', type: 'warning' },
        { id: 2, message: 'Scheduled system maintenance at 2:00 AM.', type: 'info' },
    ];

    return (
        <div className="p-6  flex gap-2 flex-row lg:flex-col dark:bg-gray-800 rounded-xl">
            {/* Notifications Section */}
            <div className="bg-white dark:bg-gray-700 p-2 rounded shadow-md">
                <div className=' border-b-2 text-gray-500 py-2'>
                <h1 className="text-sm font-bold ">Notifications</h1>
                </div>
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="p-3 border-b last:border-b-0 border-gray-200"
                            >
                                {notification.message}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No notifications available.</p>
                    )}
            </div>

            {/* Alerts Section */}
        
                <div className="bg-white dark:bg-gray-700 flex flex-col gap-2 p-2 rounded shadow-md">
                    <div className=' border-b-2 text-gray-500 py-2'>
                        <h1 className="text-sm font-bold ">Alerts</h1>
                    </div>
                    {alerts.length > 0 ? (
                        alerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`p-3 border-b last:border-b-0 border-gray-200 ${alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                    }`}
                            >
                                {alert.message}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No alerts at this time.</p>
                    )}
            </div>
        </div>
    );
}

export default NotificationsAndAlerts;
