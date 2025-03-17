'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { useModal } from '@/hooks/modal-store';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import useStaffStore from '@/hooks/staff-store';
import { deleteOxygenEntry as deleteOxygenEntryAction } from '@/lib/actions/department';
// import { signOut } from 'next-auth/react';
function DeleteOxygenEntryModal() {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === 'deleteOxygenEntry';
    const { toast } = useToast();
    const { deleteOxygenEntry, updateDailyOxygenConsumption } = useStaffStore();
    // const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!data?.entryId) {
            toast({ title: 'Error', description: 'No oxygen entry selected for deletion.' });
            return;
        }

        setLoading(true);
        try {
            const res = await deleteOxygenEntryAction(data.entryId as string);
            if (res.success) {
                deleteOxygenEntry(data.entryId as string);
                updateDailyOxygenConsumption(res?.data, "subtract");
                toast({ title: 'Success', description: 'Oxygen entry deleted successfully.' });
                // router.refresh();
                onClose();
            } else {
                toast({ title: 'Error', description: res.message });
                // signOut({ redirectTo: '/login' });
            }
        } catch (error) {
            console.error('Failed to delete oxygen entry:', error);
            toast({ title: 'Error', description: 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Delete Oxygen Entry</DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        Are you sure you want to delete this oxygen entry? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end space-x-4 mt-4">
                    <Button variant="ghost" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                        {loading ? 'Deleting...' : 'Confirm'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteOxygenEntryModal; 