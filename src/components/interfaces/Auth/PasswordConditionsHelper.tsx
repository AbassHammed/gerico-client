/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
type PasswordConditionsHelperProps = {
  password: string;
};

type PasswordConditionProps = {
  title: string;
  isMet: boolean;
};

const PasswordCondition = ({ title, isMet }: PasswordConditionProps) => (
  <div
    className={`flex items-center gap-1 space-x-1.5 transition duration-200 ${
      isMet ? 'text-foreground-light' : 'text-foreground-lighter'
    }`}>
    {isMet ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4">
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        className="w-4 h-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
        />
      </svg>
    )}

    <p className="text-sm">{title}</p>
  </div>
);

const PasswordConditionsHelper = ({ password }: PasswordConditionsHelperProps) => {
  const isEightCharactersLong = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  // eslint-disable-next-line no-useless-escape
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};`':"\\|,.<>\/?]/.test(password);

  return (
    <div className="text-sm">
      <PasswordCondition title="Une lettre majuscule" isMet={hasUppercase} />
      <PasswordCondition title="Une lettre minuscule" isMet={hasLowercase} />
      <PasswordCondition title="Un chiffre" isMet={hasNumber} />
      <PasswordCondition
        title="Un caractère spécial (ex: ()!?<>@#$%)"
        isMet={hasSpecialCharacter}
      />
      <PasswordCondition title="8 caractères minimum" isMet={isEightCharactersLong} />
      {password.length > 72 && <PasswordCondition title="72 caractères maximum" isMet={false} />}
    </div>
  );
};

export default PasswordConditionsHelper;
