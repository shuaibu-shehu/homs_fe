'use client';

import { Dialog, DialogDescription, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Form, FormField, FormItem, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomeButton from '../global/custome-button';
import { useModal } from '@/hooks/modal-store';
import { addStaff } from '@/lib/actions/department';
import {  AddStaffSchema } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { signOut } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { Label } from '../ui/label';
import useAdminStore from '@/hooks/admin-store';



function AddStafftModal() {
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === 'addStaff';
    const { toast } = useToast();
    const params = useParams();
    const departmentId = params.id;
    const { addStaffToDepartment } = useAdminStore();

    const form = useForm<z.infer<typeof AddStaffSchema>>({
        mode: 'onChange',
        resolver: zodResolver(AddStaffSchema),
        defaultValues: { 
            name: '', 
            role: '', 
            status: '', 
            contact: '',
            email: ''
        },
    });

    
    const loading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof AddStaffSchema>) => {
        try {

            const res = await addStaff(data, departmentId as string);

            if (res.success === true) {
                toast({ title: 'Success', description: 'Staff added successfully' });
                addStaffToDepartment(departmentId as string, res.data);
                
                // router.push(`/list/departments/${res.data.id}`);
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
            console.error('Failed to add staff:', error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Add Staff</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Enter the details below to add a new staff member.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="name">Name</Label>
                                    <FormControl>
                                        <Input {...field} id="name" placeholder="Name" disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Role */}
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="role">Role</Label>
                                    <FormControl>
                                        <Input {...field} id="role" placeholder="Role" disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Status */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="status">Status</Label>
                                    <FormControl>
                                        <Input {...field} id="status" placeholder="Status" disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Contact */}
                        <FormField
                            control={form.control}
                            name="contact"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="contact">Contact</Label>
                                    <FormControl>
                                        <Input {...field} id="contact" placeholder="Contact" disabled={loading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="email">Email</Label>
                                    <FormControl>
                                        <Input {...field} id="email" placeholder="Email" disabled={loading} />
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
                                    Add Staff
                                </CustomeButton>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddStafftModal;
