/**
 * Enum listing all the page URLs for the web application.
 */
export enum PagesRoutes {
  /**
   * The main index page of the application.
   */
  Index = '/',

  /**
   * The support or assistance page.
   */
  Support = '/assistance',

  /**
   * The sign-in authentication page.
   */
  Auth_SignIn = '/auth/se-connecter',

  /**
   * The change default password page.
   */
  Auth_ChangeDefaultPassword = '/auth/changer-mot-de-passe-par-defaut',

  /**
   * The password reset page.
   */
  Auth_ResetPassword = '/auth/reset-mot-de-passe',

  /**
   * The forgot password page.
   */
  Auth_ForgotPassword = '/auth/mot-de-passe-oublie',

  /**
   * The home page for employees.
   */
  Employee_Home = '/employe',

  /**
   * The payslips page for employees.
   */
  Employee_Payslips = '/employe/fiches-de-paie',

  /**
   * The leave request page for employees.
   */
  Employee_LeaveRequest = '/employe/conges',

  /**
   * The leave list page for employees.
   */
  Employee_LeaveList = '/employe/conges/liste',

  /**
   * The dashboard page for administrators.
   */
  Admin_Dashboard = '/admin',

  /**
   * The employees page for administrators.
   */
  Admin_Employees = '/admin/employes',

  /**
   * The settings page for administrators.
   */
  Admin_Settings = '/admin/parametres',

  /**
   * The create employee page for administrators.
   */
  Admin_CreateEmployee = '/admin/employes/creer',

  /**
   * The create payslip page for administrators.
   */
  Admin_CreatePayslip = '/admin/fiches-de-paie/creer',

  /**
   * The approve leaves page for administrators.
   */
  Admin_ApproveLeaves = '/admin/conges',

  /**
   * The update employee page for administrators.
   */
  Admin_UpdateEmployee = '/admin/employes/[slug]/maj',

  /**
   * The page listing all payslips for administrators.
   */
  Admin_AllPayslips = '/admin/fiches-de-paie',
}
