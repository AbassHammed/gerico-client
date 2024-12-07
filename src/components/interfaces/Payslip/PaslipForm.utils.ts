/* eslint-disable space-before-function-paren */
import * as Yup from 'yup';

const weeklyHoursSchema = Yup.array().of(
  Yup.object().shape({
    week: Yup.number()
      .required('Week is required')
      .positive('Week must be a positive number')
      .integer('Week must be an integer'),
    worked_hours: Yup.number()
      .required('Worked hours are required')
      .min(0, 'Worked hours cannot be negative')
      .max(168, 'Worked hours cannot exceed 168 (24 hours * 7 days)'),
    overtime: Yup.number()
      .required('Overtime is required')
      .min(0, 'Overtime cannot be negative')
      .test('is-valid-overtime', 'Overtime calculation is incorrect', function (value) {
        const worked_hours = this.parent.worked_hours;
        const expected_overtime = worked_hours > 35 ? worked_hours - 35 : 0;
        return value === expected_overtime;
      }),
  }),
);

export default weeklyHoursSchema;
