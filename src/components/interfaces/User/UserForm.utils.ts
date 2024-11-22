/* eslint-disable quotes */
import * as Yup from 'yup';

const userSchema = Yup.object({
  civility: Yup.string().required('La civilité est requise'),
  first_name: Yup.string()
    .required('Le prénom est requis')
    .max(50, 'Le prénom ne doit pas dépasser 50 caractères'),
  last_name: Yup.string()
    .required('Le nom est requis')
    .max(50, 'Le nom ne doit pas dépasser 50 caractères'),
  phone_number: Yup.string()
    .required('Le numéro de téléphone est requis')
    .max(20, 'Le numéro de téléphone ne doit pas dépasser 20 caractères')
    .matches(
      /^(?:(?:\+33)|0)[1-9][0-9]{8}$/,
      'Le format du numéro doit être 0678145963 ou +33678145963',
    ),
  email: Yup.string()
    .email('Adresse email invalide')
    .required("L'email est requis")
    .max(100, "L'email ne doit pas dépasser 100 caractères"),
  job_title: Yup.string()
    .required("L'intitulé du poste est requis")
    .max(100, "L'intitulé du poste ne doit pas dépasser 100 caractères"),
  date_of_birth: Yup.string().required('La date de naissance est requise'),
  job_department: Yup.string()
    .required('Le service est requis')
    .max(100, 'Le nom du service ne doit pas dépasser 100 caractères'),
  remaining_leave_balance: Yup.number()
    .required('Le solde de congés est requis')
    .positive('Le solde de congés doit être positif')
    .max(999.9, 'Le solde de congés doit être inférieur à 1000'),
  is_admin: Yup.boolean().default(false),
  hire_date: Yup.string().required("La date d'embauche est requise"),
  address_line1: Yup.string()
    .required("L'adresse est requise")
    .max(255, "L'adresse ne doit pas dépasser 255 caractères"),
  address_line2: Yup.string().max(
    255,
    "Le complément d'adresse ne doit pas dépasser 255 caractères",
  ),
  city: Yup.string()
    .required('La ville est requise')
    .max(100, 'La ville ne doit pas dépasser 100 caractères'),
  postal_code: Yup.string()
    .required('Le code postal est requis')
    .max(20, 'Le code postal ne doit pas dépasser 20 caractères'),
  country: Yup.string()
    .required('Le pays est requis')
    .max(50, 'Le pays ne doit pas dépasser 50 caractères'),
  social_security_number: Yup.string()
    .required('Le numéro de sécurité sociale est requis')
    .min(15, 'Le numéro de sécurité sociale doit contenir 15 caractères')
    .max(15, 'Le numéro de sécurité sociale doit contenir 15 caractères'),
  contract_type: Yup.string().required('Le type de contrat est requis'),
  marital_status: Yup.string().required('La situation familiale est requise'),
  dependants: Yup.number()
    .required('Le nombre de personnes à charge est requis')
    .integer('Le nombre de personnes à charge doit être un nombre entier')
    .min(0, 'Le nombre de personnes à charge doit être supérieur ou égal à 0'),
});

export type UserSchemaType = Yup.InferType<typeof userSchema>;

export const generateFormValues = (config: Partial<UserSchemaType> = {}): UserSchemaType => ({
  civility: config.civility || 'Non spécifié',
  first_name: config.first_name || '',
  last_name: config.last_name || '',
  phone_number: config.phone_number || '',
  email: config.email || '',
  job_title: config.job_title || '',
  date_of_birth: config.date_of_birth || '',
  job_department: config.job_department || '',
  remaining_leave_balance: config.remaining_leave_balance || 0,
  is_admin: config.is_admin ?? false,
  hire_date: config.hire_date || '',
  address_line1: config.address_line1 || '',
  address_line2: config.address_line2 || '',
  city: config.city || '',
  postal_code: config.postal_code || '',
  country: config.country || '',
  social_security_number: config.social_security_number || '',
  contract_type: config.contract_type || 'CDD',
  marital_status: config.marital_status || 'Non spécifié',
  dependants: config.dependants || 0,
});

export const ContractTypeOptions = [
  {
    label: 'CDI',
    value: 'CDI',
  },
  {
    label: 'CDD',
    value: 'CDD',
  },
  {
    label: 'Stage',
    value: 'Stage',
  },
  {
    label: 'Alternance',
    value: 'Alternance',
  },
  {
    label: 'Intérim',
    value: 'Intérim',
  },
  {
    label: 'Apprentissage',
    value: 'Apprentissage',
  },
  {
    label: 'Professionnalisation',
    value: 'Professionnalisation',
  },
];

export const MaritalStatusOptions = [
  {
    label: 'Célibataire',
    value: 'Célibataire',
  },
  {
    label: 'Marié(e)',
    value: 'Marié(e)',
  },
  {
    label: 'Pacsé(e)',
    value: 'Pacsé(e)',
  },
  {
    label: 'Divorcé(e)',
    value: 'Divorcé(e)',
  },
  {
    label: 'Séparé(e)',
    value: 'Séparé(e)',
  },
  {
    label: 'Veuf/Veuve',
    value: 'Veuf/Veuve',
  },
  {
    label: 'Concubinage',
    value: 'Concubinage',
  },
  {
    label: 'Non spécifié',
    value: 'Non spécifié',
  },
];

export const CivilityOptions = [
  {
    label: 'Monsieur',
    value: 'Monsieur',
  },
  {
    label: 'Madame',
    value: 'Madame',
  },
  {
    label: 'Non spécifié',
    value: 'Non spécifié',
  },
];

export { userSchema };
