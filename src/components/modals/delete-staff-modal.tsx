'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import useAdminStore from '@/hooks/admin-store';
import { useModal } from '@/hooks/modal-store';
import { deleteStaff } from '@/lib/actions/department';
import { useToast } from '@/hooks/use-toast';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function DeleteStaffModal() {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === 'deleteStaff';
    const { toast } = useToast();
    const { deleteStaffFromDepartment } = useAdminStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!data?.departmentId || !data?.staffId) {
            toast({ title: 'Error', description: 'No staff member selected for deletion.' });
            return;
        }

        setLoading(true);
        try {
            const res = await deleteStaff(data.departmentId as string, data.staffId as string);
            if (res.success) {
                deleteStaffFromDepartment(data.departmentId as string, data.staffId as string);
                toast({ title: 'Success', description: 'Staff member deleted successfully.' });
                router.refresh();
                onClose();
            } else if (res.status === 403) {
                toast({ title: 'Error', description: res.message });
                signOut({ redirectTo: '/login' });
            } else {
                toast({ title: 'Error', description: res.message });
            }
        } catch (error) {
            console.error('Failed to delete staff member:', error);
            toast({ title: 'Error', description: 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Delete Staff Member</DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        Are you sure you want to delete this staff member? This action cannot be undone.
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

export default DeleteStaffModal; 