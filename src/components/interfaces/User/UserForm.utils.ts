import * as Yup from 'yup';

const userSchema = Yup.object({
  civility: Yup.string().required('Civility is required'),
  first_name: Yup.string()
    .required('First name is required')
    .max(50, 'First name must be at most 50 characters'),
  last_name: Yup.string()
    .required('Last name is required')
    .max(50, 'Last name must be at most 50 characters'),
  phone_number: Yup.string()
    .required('Phone number is required')
    .max(20, 'Phone number must be at most 20 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .max(100, 'Email must be at most 100 characters'),
  job_title: Yup.string()
    .required('Job title is required')
    .max(100, 'Job title must be at most 100 characters'),
  date_of_birth: Yup.string().required('Date of birth is required'),
  job_department: Yup.string()
    .required('Department is required')
    .max(100, 'Department name must be at most 100 characters'),
  remaining_leave_balance: Yup.number()
    .required('Remaining leave balance is required')
    .positive('Remaining leave balance must be positive')
    .max(999.9, 'Remaining leave balance must be less than 1000'),
  is_admin: Yup.boolean().default(false),
  hire_date: Yup.string().required('Hire date is required'),
  address_line1: Yup.string()
    .required('Address line 1 is required')
    .max(255, 'Address line 1 must be at most 255 characters'),
  address_line2: Yup.string().max(255, 'Address line 2 must be at most 255 characters'),
  city: Yup.string().required('City is required').max(100, 'City must be at most 100 characters'),
  postal_code: Yup.string()
    .required('Postal code is required')
    .max(20, 'Postal code must be at most 20 characters'),
  country: Yup.string()
    .required('Country is required')
    .max(50, 'Country must be at most 50 characters'),
  social_security_number: Yup.string()
    .required('Social security number is required')
    .min(15, 'Social security number must be at least 15 characters')
    .max(15, 'Social security number must be at most 15 characters'),
  contract_type: Yup.string().required('Contract type is required'),
  marital_status: Yup.string().required('Marital status is required'),
  dependants: Yup.number()
    .required('Number of dependants is required')
    .integer('Number of dependants must be an integer')
    .min(0, 'Number of dependants must be at least 0'),
});

export type UserSchemaType = Yup.InferType<typeof userSchema>;

export const generateFormValues = (config: Partial<UserSchemaType> = {}): UserSchemaType => ({
  civility: config.civility || 'autre',
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
  marital_status: config.marital_status || 'célibataire',
  dependants: config.dependants || 0,
});

export { userSchema };
