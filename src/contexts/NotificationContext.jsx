import React, { createContext, useContext, useState, useCallback } from 'react';
import Icon from '../components/AppIcon';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);
    
    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, duration);
    }
    
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const value = {
    notifications,
    addNotification,
    removeNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

const NotificationItem = ({ notification, onRemove }) => {
  const { id, message, type } = notification;

  const getNotificationStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-success/90 text-success-foreground border-success/20';
      case 'error':
        return 'bg-destructive/90 text-destructive-foreground border-destructive/20';
      case 'warning':
        return 'bg-warning/90 text-warning-foreground border-warning/20';
      default:
        return 'bg-card/90 text-foreground border-border';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      default:
        return 'Info';
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border backdrop-blur-sm shadow-lg min-w-[300px] animate-in slide-in-from-right-full duration-300 ${getNotificationStyle()}`}
    >
      <Icon name={getIcon()} size={20} />
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={() => onRemove(id)}
        className="hover:opacity-70 transition-opacity"
      >
        <Icon name="X" size={16} />
      </button>
    </div>
  );
};
