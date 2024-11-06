'use client';

import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/shadcn/ui/form';
import { Input } from '@/components/ui/shadcn/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/shadcn/ui/input-otp';
import { useResetPassword } from '@/hooks/useResetPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { passwordSchema } from '../change-password/page';
import AuthButton from '../components/button';
import ResendPasswordButton from '../components/resend-password-button';

const ResetPasswordFormSchema = z
  .object({
    reset_code: z.string().min(6, {
      message: 'Your one-time code must be 6 characters.',
    }),
    password: passwordSchema,
    confirm_password: passwordSchema,
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Password do not match',
    path: ['passwordConfirmation'],
  });

const ResetPassword = () => {
  const { resetPassword, loading } = useResetPassword();
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      reset_code: '',
      password: '',
      confirm_password: '',
    },
  });

  const handlePasswordReset = async (data: {
    reset_code: string;
    password: string;
    confirm_password: string;
  }) => {
    try {
      const uid = sessionStorage.getItem('t_uid')!;
      const inputs = { ...data, uid };

      const res = await resetPassword(inputs);
      if (res) {
        router.push('/auth');
        return;
      }
    } catch (error: any) {
      toast.error('Invalid operation', {
        description: error.message,
      });
    }
  };

  return (
    <main className="w-full h-full flex flex-col items-center justify-center md:px-4">
      <div className="w-full space-y-6 ">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-2xl">Changer mot de passe</h3>
          </div>
        </div>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePasswordReset)} className="space-y-4">
              <FormField
                control={form.control}
                name="reset_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time code</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        onKeyDown={handleKeyDown}
                        disabled={loading}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time code sent to your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        autoComplete="off"
                        {...field}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        autoComplete="off"
                        {...field}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end text-sm">
                <ResendPasswordButton />
              </div>

              <AuthButton loading={loading}>Soumettre</AuthButton>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};
export default ResetPassword;
