// Centralize activity -> notification event name so both ActivityFeed and NavBar stay in sync.
export const ACTIVITY_NOTIFICATION_EVENT = "activity-notification";

/**
 * Backward compatible notification shape.
 * - Old payload: { activities: string[] }
 * - New payload: { notifications: Array<{id, message, createdAt, read}> }
 */
export function normalizeNotificationPayload(detail = {}) {
  const { notifications, activities } = detail || {};

  if (Array.isArray(notifications)) return notifications;

  if (Array.isArray(activities)) {
    const now = Date.now();
    return activities.map((message, idx) => ({
      id: `legacy-${now}-${idx}`,
      message: String(message),
      createdAt: now - idx * 1000,
      read: false,
    }));
  }

  return [];
}


