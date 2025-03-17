'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Form, FormField, FormItem, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useModal } from '@/hooks/modal-store';
import { useToast } from '@/hooks/use-toast';
import CustomeButton from '../global/custome-button';
import { AddBedSchema } from '@/lib/types';
import { addBedAction } from '@/lib/actions/department';

// Define the schema using Zod
function AddBedModal() {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === 'addBed';
    const { toast } = useToast();
    const { departmentId } = data as { departmentId: string };

    const form = useForm<z.infer<typeof AddBedSchema>>({
        resolver: zodResolver(AddBedSchema),
        defaultValues: {
            bedNumber: 0,
            sensorId: '',
        },
    });

    const { handleSubmit, reset } = form;
    const loading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof AddBedSchema>) => {
        try {
            // Add your bed creation action here
            const response = await addBedAction(data, departmentId);
            console.log(response);
            if (response.success) {
                toast({ title: 'Success', description: 'Bed added successfully.' });
                onClose();
                reset();
            } else {
                toast({ title: 'Error', description: "Failed to add bed" });
            }
        } catch (error) {
            console.error('Failed to add bed:', error);
            toast({ title: 'Error', description: 'An unexpected error occurred.' });
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Add New Bed</DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        Please fill in the details below to add a new bed.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                        {/* Bed Number */}
                        <FormField
                            control={form.control}
                            name="bedNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <label htmlFor="bedNumber" className="block text-sm font-medium text-gray-700">
                                        Bed Number
                                    </label>
                                    <FormControl>
                                        <Input
                                            id="bedNumber"
                                            type="number"
                                            placeholder="Enter bed number"
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            disabled={loading}
                                            className="mt-1 block w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Sensor ID (Optional) */}
                        <FormField
                            control={form.control}
                            name="sensorId"
                            render={({ field }) => (
                                <FormItem>
                                    <label htmlFor="sensorId" className="block text-sm font-medium text-gray-700">
                                        Sensor ID (Optional)
                                    </label>
                                    <FormControl>
                                        <Input
                                            id="sensorId"
                                            type="text"
                                            placeholder="Enter sensor ID"
                                            {...field}
                                            disabled={loading}
                                            className="mt-1 block w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="flex justify-end space-x-4 mt-4">
                            <Button variant="ghost" onClick={onClose} disabled={loading}>
                                Cancel
                            </Button>
                            <CustomeButton type="submit" isLoading={loading}>
                                Submit
                            </CustomeButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddBedModal; 