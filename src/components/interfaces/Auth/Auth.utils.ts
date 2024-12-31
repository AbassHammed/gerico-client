import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, { message: 'Votre mot de passe doit contenir au moins 8 caractères.' })
  .max(16, { message: 'Votre mot de passe ne peut pas dépasser 16 caractères.' })
  .refine(motDePasse => /[A-Z]/.test(motDePasse), {
    message: 'Votre mot de passe doit contenir au moins une majuscule.',
  })
  .refine(motDePasse => /[a-z]/.test(motDePasse), {
    message: 'Votre mot de passe doit contenir au moins une minuscule.',
  })
  .refine(motDePasse => /[0-9]/.test(motDePasse), {
    message: 'Votre mot de passe doit contenir au moins un chiffre.',
  })
  .refine(motDePasse => /[!@#$%^&*()]/.test(motDePasse), {
    message: 'Votre mot de passe doit contenir au moins un caractère spécial.',
  });
