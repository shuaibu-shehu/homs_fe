'use client';

import { Dialog, DialogDescription, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Form, FormField, FormItem, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomeButton from '../global/custome-button';
import useAdminStore from '@/hooks/admin-store';
import { useModal } from '@/hooks/modal-store';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { addDepartment } from '@/lib/actions/department';
import { AddDepartmentSchema } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';



function AddDepartmentModal() {
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === 'addDepartment';
    const { toast } = useToast();
    const { addDepartment: addDepartmentStore} = useAdminStore();
    const router = useRouter();
    const form = useForm<z.infer<typeof AddDepartmentSchema>>({
        mode: 'onChange',
        resolver: zodResolver(AddDepartmentSchema),
        defaultValues: { name: '', status: true },
    });

    const loading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof AddDepartmentSchema>) => {
            
        try {

            const res = await addDepartment(data);
            // console.clear();
            if (res.success === true) {
                addDepartmentStore({ ...res.data, users: [], staffs: 0 });
                toast({ title: 'Success', description: 'Department added successfully' });
                router.push(`/list/departments/${res.data.id}`);
                onClose(); // Close modal on success
            }

            if (res.status === 403) {
                toast({ title: 'Error', description: res.message });
                signOut({ redirectTo: '/login' });
            }

            if (res.success === false) {
                toast({ title: 'Error', description: res.message });
            }

        } catch (error) {
            console.error('Failed to add department:', error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Add Department</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Enter the details below to create a new department.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
                        {/* Department Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Department Name" disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Status Select */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(value === 'true')}
                                            disabled={loading}
                                            value={field.value.toString()}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Active</SelectItem>
                                                <SelectItem value="false">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <div className="flex justify-between w-full items-center">
                                <Button disabled={loading} onClick={onClose} variant="ghost">
                                    Cancel
                                </Button>
                                <CustomeButton type="submit" isLoading={loading}>
                                    Add Department
                                </CustomeButton>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddDepartmentModal;
