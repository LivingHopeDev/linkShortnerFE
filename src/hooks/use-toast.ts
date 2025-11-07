import { toast as sonnerToast } from "sonner";

// Return a loosely-typed toast wrapper to avoid tight typing conflicts in the app.
export const useToast = () => ({
	toast: (opts: any) => {
		// Forward to sonner's toast
		return sonnerToast(opts as any);
	},
});

export default useToast;
