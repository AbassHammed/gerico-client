'use client';

import React from 'react';

import { Text, View } from '@react-pdf/renderer';

import { styles } from '../styles';

interface NetSalaryRowProps {
  grossSalary: number;
  totalSalarial: number;
  taux: number;
}

const NetSalaryRowAfterTaxes: React.FC<
  NetSalaryRowProps
> = (/* { grossSalary, totalSalarial, taux } */) => (
  // j'ai du commenter pour pouvoir commit

  /* TO DO :
   Ca c'est des calculs réalisés dans le composant TaxTable mais nécéssaire pour le composant actuel (NetSalaryRowAfterTaxes)
     on prend le salaire net avant impôt sur le revenu et on soutrait le montant de l'impôt sur le revenu.
     par exemple on a :
     +--------------------------------------+---------------+
     | SALAIRE NET AVANT IMPÔT SUR LE REVENU|   1524.78 €   |
     +--------------------------------------+---------------+

     +--------------------------------------+---------------+---------------+---------------+
     |IMPÔT SUR LE REVENU                   |   Base        |   Taux        |   Montant     |
     +--------------------------------------+---------------+---------------+---------------+
     |IMPÔT PRÉLEVÉ À LA SOURCE             |   A           |   B           |   C           |
     +--------------------------------------+---------------+---------------+---------------+

     A = NET AVANT IMPOT + CSG_CRDS imposables
     A = 1524.78 + (98.25%(constante) du salaire brut * 2.90%(constante)) = 1579.66 €

     B = 3.10% (constante) --> 0.0310 (oublie pas la conversion)

     C = A * B = 48.97 €

     ca c'est les calculs nécéssaire pour ce COMPOSANT ci-dessous (NetSalaryAfterTaxes)

    1524.78 - 48.97 = 1475.81 €
     +--------------------------------------+---------------+
     | SALAIRE NET APRES IMPOT SUR LE REVENU|   1475.81 €   |
     +--------------------------------------+---------------+

  */
  // exemple de calculs possible, adapte par rapport à la nouvelle structure que t'as faite

  // const netSalaryBeforeTax = (grossSalary - totalSalarial).toFixed(2);
  // const totalCSG_CRDS = (grossSalary * CSG_CRDS_percentage * taux).toFixed(2);
  // const NetSalaryAfterTaxes = (Number(netSalaryBeforeTax) + Number(totalCSG_CRDS)).toFixed(2);
  // const ImpotTaux = 0.0310;
  // const MontantImpot = ((Number(NetSalaryAfterTaxes) * ImpotTaux)).toFixed(2);
  // const NetSalaryAfterTotalTaxes = (Number(netSalaryBeforeTax) - Number(MontantImpot)).toFixed(2);

  <View style={styles.middleSectionContainer}>
    <View style={styles.leaveRequestContainer1}>
      <View style={styles.leaveRequestRow}>
        <Text style={[styles.leaveRequestCell, styles.leaveRequestHeaderCell3, styles.boldText]}>
          NET À PAYER APRÈS IMPÔT SUR LE REVENU (en €)
        </Text>
        <Text style={[styles.leaveRequestCell, styles.leaveRequestHeaderCell4]}>
          {/* {NetSalaryAfterTotalTaxes} € */}
        </Text>
      </View>
    </View>
  </View>
);
export default NetSalaryRowAfterTaxes;
