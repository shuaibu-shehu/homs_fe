'use client';

import { Dialog, DialogDescription, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Form, FormField, FormItem, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomeButton from '../global/custome-button';
import axios from 'axios';
import { useModal } from '@/hooks/modal-store';

// Schema for validation
const AddDepartmentSchema = z.object({
    name: z.string().nonempty('Department name is required'),
        status: z.boolean()
    });


type AddDepartmentFormValues = z.infer<typeof AddDepartmentSchema>;

function AddDepartmentModal() {
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === 'addDepartment';

    const form = useForm<AddDepartmentFormValues>({
        mode: 'onChange',
        resolver: zodResolver(AddDepartmentSchema),
        defaultValues: { name: '', status: true },
    });

    const loading = form.formState.isSubmitting;

    const onSubmit = async (data: AddDepartmentFormValues) => {
        try {
            await axios.post('/api/departments', data); // Replace with your actual API endpoint
            onClose(); // Close modal on success
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

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value.toString()}
                                            disabled={loading}
                                            className="input w-full p-2"
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
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
                                <CustomeButton isLoading={loading}>
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
