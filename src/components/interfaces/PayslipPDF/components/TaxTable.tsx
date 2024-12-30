'use client';

import React from 'react';

import { Text, View } from '@react-pdf/renderer';

import { styles } from '../styles';

const CSG_CRDS_PERCENTAGE = 0.9825;
const CSG_CRDS_PERCENTAGE_TAX = 0.029;
const TAX_RATE = 0.031;
interface TaxTableProps {
  grossSalary: number;
  totalSalarial: number;
}

const TaxTable: React.FC<TaxTableProps> = ({ grossSalary, totalSalarial }) => {
  const netSalaryBeforeTax = (grossSalary - totalSalarial).toFixed(2);
  const totalCSG_CRDS = (grossSalary * CSG_CRDS_PERCENTAGE * CSG_CRDS_PERCENTAGE_TAX).toFixed(2);
  const NetSalaryAfterTaxes = (Number(netSalaryBeforeTax) + Number(totalCSG_CRDS)).toFixed(2);
  const MontantImpot = (Number(NetSalaryAfterTaxes) * TAX_RATE).toFixed(2);

  return (
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
          {NetSalaryAfterTaxes}
        </Text>
        <Text style={[styles.leaveRequestCellTax, styles.leaveRequestHeaderCell2]}>{TAX_RATE}</Text>
        <Text style={[styles.leaveRequestCellTax, styles.leaveRequestHeaderCell2]}>
          {MontantImpot}
        </Text>
      </View>
    </View>
  );
};

export default TaxTable;
