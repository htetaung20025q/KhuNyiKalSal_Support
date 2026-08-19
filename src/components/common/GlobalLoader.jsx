import React from 'react';
import { useLoading } from '@/context/LoadingContext';
import Spinner from '@/components/ui/Spinner';
import { FullPageSkeleton } from '@/components/ui/Skeleton';


const GlobalLoader = ({ type: defaultType = 'spinner', forceShow = false }) => {
  const { isLoading, loadingType, message } = useLoading();
  
  // Can be forced to show (e.g., as a Suspense fallback) or driven by context
  const isVisible = forceShow || isLoading;
  const type = forceShow ? defaultType : loadingType;

  if (!isVisible) return null;

  if (type === 'skeleton') {
    return (
      <div className="fixed inset-0 z-50 bg-slate-50 overflow-y-auto">
        <FullPageSkeleton />
        {message && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 font-medium">
            {message}
          </div>
        )}
      </div>
    );
  }

  // Default Spinner Overlay
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4">
        <Spinner size="lg" />
        {message && <p className="text-slate-700 font-bold mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default GlobalLoader;
