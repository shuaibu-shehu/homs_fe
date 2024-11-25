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
import { Textarea } from '../ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useModal } from '@/hooks/modal-store';
import { useToast } from '@/hooks/use-toast';
import CustomeButton from '../global/custome-button';
import { AddOxygenEntrySchema } from '@/lib/types';
import { addOxygenEntryAction } from '@/lib/actions/department';
import { useSession } from 'next-auth/react';
import useStaffStore from '@/hooks/staff-store';

// Define the schema using Zod


function AddOxygenEntryModal() {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === 'addOxygenEntry';
    const { addOxygenEntry, updateDailyOxygenConsumption } = useStaffStore();
    const user = useSession().data?.user;
    const { toast } = useToast();
    const { departmentId } = data as { departmentId: string };
    const form = useForm<z.infer<typeof AddOxygenEntrySchema>>({
        resolver: zodResolver(AddOxygenEntrySchema),
        defaultValues: {
            totalConsumption: 0,
            bedNumber: '',
            isFirstTimeUsage: true,
            remarks: '',
        },
    });

    const { handleSubmit, reset } = form;
   
    const loading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof AddOxygenEntrySchema>) => {
        try {
            
            const response = await addOxygenEntryAction(data, departmentId, user?.userId as string);
            console.log("response: ", response);
            if (response.success) {
                addOxygenEntry(response.data);
                updateDailyOxygenConsumption(response.data, "add");
                toast({ title: 'Success', description: 'Oxygen entry added successfully.' });
                onClose();
                reset();
            }

        } catch (error) {
            console.error('Failed to add oxygen entry:', error);
            toast({ title: 'Error', description: 'An unexpected error occurred.' });
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Add Oxygen Entry</DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        Please fill in the details below to add a new oxygen consumption entry.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                        {/* Total Oxygen Consumed */}
                        <FormField
                            control={form.control}
                            name="totalConsumption"
                            render={({ field }) => (
                                <FormItem>
                                    <label htmlFor="totalConsumption" className="block text-sm font-medium text-gray-700">
                                        Total Oxygen Consumed
                                    </label>
                                    <FormControl>
                                        <Input
                                            id="totalConsumption"
                                            type="number"
                                            placeholder="Enter total oxygen consumed"
                                            {...field}
                                            disabled={loading}
                                            min={1}
                                            className="mt-1 block w-full"
                                            value={field.value}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Bed Number */}
                        <FormField
                            control={form.control}
                            name="bedNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <label htmlFor="bedNo" className="block text-sm font-medium text-gray-700">
                                        Bed Number
                                    </label>
                                    <FormControl>
                                        <Input
                                            id="bedNumber"
                                            type="text"
                                            placeholder="Enter bed number"
                                            {...field}
                                            disabled={loading}
                                            className="mt-1 block w-full"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* First Time Usage */}
                        <FormField
                            control={form.control}
                            name="isFirstTimeUsage"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="h-4 w-4"
                                        />
                                    </FormControl>
                                    <label className="text-sm font-medium text-gray-700">
                                        Is this a first-time usage?
                                    </label>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Remarks */}
                        <FormField
                            control={form.control}
                            name="remarks"
                            render={({ field }) => (
                                <FormItem>
                                    <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">
                                        Remarks
                                    </label>
                                    <FormControl>
                                        <Textarea
                                            id="remarks"
                                            placeholder="Enter any remarks"
                                            {...field}
                                            disabled={loading}
                                            rows={4}
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

export default AddOxygenEntryModal; 