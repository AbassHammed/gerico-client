/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Hammed Abass. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export const CATEGORY_OPTIONS = [
  {
    value: 'others',
    label: 'Autres demandes',
    description: 'Questions générales ou demandes diverses',
  },
  {
    value: 'payslip',
    label: 'Fiche de paie',
    description: "Problèmes d'accès ou de téléchargement des bulletins de salaire",
  },
  {
    value: 'leave',
    label: 'Congés',
    description: 'Assistance pour les demandes de congés',
  },
  {
    value: 'auth',
    label: 'Connexion',
    description: "Problèmes de connexion ou d'authentification",
  },
];

export const SEVERITY_OPTIONS = [
  {
    value: 'Low',
    label: 'Faible',
    description: "Simple demande d'information",
  },
  {
    value: 'Normal',
    label: 'Normal',
    description: 'Fonctionnement perturbé',
  },
  {
    value: 'High',
    label: 'Élevé',
    description: 'Problème bloquant pour le travail',
  },
  {
    value: 'Urgent',
    label: 'Urgent',
    description: 'Système complètement inaccessible',
  },
];
