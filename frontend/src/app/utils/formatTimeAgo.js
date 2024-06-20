// utils/formatTimeAgo.js
import { formatDistanceToNow } from 'date-fns';

export const formatTimeAgo = (isoString) => {
  return formatDistanceToNow(new Date(isoString), { addSuffix: true });
};
