'use client';

import React from 'react';

import { CSG_CRDS_PERCENTAGE, CSG_CRDS_PERCENTAGE_TAX, TAX_RATE } from '@/lib/constants';
import { Text, View } from '@react-pdf/renderer';

import { styles } from '../styles';

interface NetSalaryRowProps {
  grossSalary: number;
  totalSalarial: number;
}

const NetSalaryRowAfterTaxes: React.FC<NetSalaryRowProps> = ({ grossSalary, totalSalarial }) => {
  const netSalaryBeforeTax = (grossSalary - totalSalarial).toFixed(2);
  const totalCsgCrds = (grossSalary * CSG_CRDS_PERCENTAGE * CSG_CRDS_PERCENTAGE_TAX).toFixed(2);
  const netSalaryAfterTaxes = (Number(netSalaryBeforeTax) + Number(totalCsgCrds)).toFixed(2);
  const montantImpot = (Number(netSalaryAfterTaxes) * TAX_RATE).toFixed(2);
  const netSalaryAfterTotalTaxes = (Number(netSalaryBeforeTax) - Number(montantImpot)).toFixed(2);

  return (
    <View style={styles.middleSectionContainer}>
      <View style={styles.leaveRequestContainer1}>
        <View style={styles.leaveRequestRow}>
          <Text style={[styles.leaveRequestCell, styles.leaveRequestHeaderCell3, styles.boldText]}>
            NET À PAYER APRÈS IMPÔT SUR LE REVENU (en €)
          </Text>
          <Text style={[styles.leaveRequestCell, styles.leaveRequestHeaderCell4]}>
            {netSalaryAfterTotalTaxes} €
          </Text>
        </View>
      </View>
    </View>
  );
};
export default NetSalaryRowAfterTaxes;
