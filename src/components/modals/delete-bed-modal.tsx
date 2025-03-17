'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { useModal } from '@/hooks/modal-store';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { deleteBed } from '@/lib/actions/bed';
import { useBedStore } from '@/hooks/bed-store';

function DeleteBedModal() {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === 'deleteBed';
    const { toast } = useToast();
    const { removeBed } = useBedStore();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!data?.bedId) {
            toast({ title: 'Error', description: 'No bed selected for deletion.' });
            return;
        }

        setLoading(true);
        try {
            const res = await deleteBed(data.bedId as string);
            if (res?.success) {
                removeBed(data.bedId as string);
                toast({ title: 'Success', description: 'Bed deleted successfully.' });
                onClose();
            } else {
                toast({ title: 'Error', description: res?.message });
            }
        } catch (error) {
            console.error('Failed to delete bed:', error);
            toast({ title: 'Error', description: 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Delete Bed</DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        Are you sure you want to delete this bed? This action cannot be undone.
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

export default DeleteBedModal; 