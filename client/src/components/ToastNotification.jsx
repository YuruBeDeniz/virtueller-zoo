

export default function ToastNotification({ message, show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-gray-100 divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
      <div className="text-sm font-normal">{message}</div>
      <button onClick={onClose} className="text-black dark:text-white">X</button>
    </div>
  );
}
  