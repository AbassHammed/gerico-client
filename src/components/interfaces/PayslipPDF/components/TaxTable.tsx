'use client';

import React from 'react';

import { Text, View } from '@react-pdf/renderer';

import { styles } from '../styles';

interface TaxTableProps {
  grossSalary: number;
  totalSalarial: number;
  taux: number;
}

const TaxTable: React.FC<TaxTableProps> = (/* { grossSalary, totalSalarial, taux } */) => (
  // J'ai du commenter pour pouvoir commit
  /* TO DO :
   on prend le salaire net avant impôt sur le revenu et on soutrait le montant de l'impôt sur le revenu.
   par exemple on a :
   +--------------------------------------+---------------+
   | SALAIRE NET AVANT IMPÔT SUR LE REVENU|   1524.78 €   |
   +--------------------------------------+---------------+

LE COMPOSANT TaxTable :

   +--------------------------------------+---------------+---------------+---------------+
   |IMPÔT SUR LE REVENU                   |   Base        |   Taux        |   Montant     |
   +--------------------------------------+---------------+---------------+---------------+
   |IMPÔT PRÉLEVÉ À LA SOURCE             |   A           |   B           |   C           |
   +--------------------------------------+---------------+---------------+---------------+

   A = NET AVANT IMPOT + CSG_CRDS imposables
   A = 1524.78 + (98.25%(constante) du salaire brut * 2.90%(constante)) = 1579.66 €

   B = 3.10% (constante) --> 0.0310 (oublie pas la conversion)

   C = A * B = 48.97 €

  */
  // Exemple à adapter !
  // const netSalaryBeforeTax = (grossSalary - totalSalarial).toFixed(2);
  // const totalCSG_CRDS = (grossSalary * CSG_CRDS_percentage * taux).toFixed(2);
  // const NetSalaryAfterTaxes = (Number(netSalaryBeforeTax) + Number(totalCSG_CRDS)).toFixed(2);
  // const ImpotTaux = 0.0310;
  // const MontantImpot = ((Number(NetSalaryAfterTaxes) * ImpotTaux)).toFixed(2);

  <View style={styles.leaveRequestContainerTax}>
    <View style={styles.leaveRequestRowTax}>
      <Text style={[styles.leaveRequestCellTax, styles.leaveRequestHeaderCell, styles.boldText]}>
        IMPÔT SUR LE REVENU
      </Text>
      <Text style={[styles.leaveRequestCellTax, styles.leaveRequestHeaderCell2]}>Base</Text>
      <Text style={[styles.leaveRequestCellTax, styles.leaveRequestHeaderCell2]}>Taux</Text>
      <Text style={[styles.leaveRequestCellTax, styles.leaveRequestHeaderCell2]}>Montant</Text>
    </View>

    <View style={styles.leaveRequestRowTax}>
      <Text style={[styles.leaveRequestCellTax, styles.leaveRequestHeaderCell, styles.boldText]}>
        IMPÔT PRÉLEVÉ À LA SOURCE
      </Text>
      <Text style={[styles.leaveRequestCellTax, styles.leaveRequestHeaderCell2]}>
        {/* {NetSalaryAfterTaxes} */}
      </Text>
      <Text style={[styles.leaveRequestCellTax, styles.leaveRequestHeaderCell2]}>
        {/* {ImpotTaux} */}
      </Text>
      <Text style={[styles.leaveRequestCellTax, styles.leaveRequestHeaderCell2]}>
        {/* {MontantImpot} */}
      </Text>
    </View>
  </View>
);
export default TaxTable;
