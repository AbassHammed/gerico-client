'use client';

import { ICompanyInfo, IUser } from '@/types';
import { Text, View } from '@react-pdf/renderer';
import { format } from 'date-fns';

import { styles } from '../styles';

const EnterpriseAndUserInfo = ({ company, user }: { company: ICompanyInfo; user: IUser }) => (
  <View style={styles.topSectionContainer}>
    <View style={styles.enterpriseInformationContainer}>
      <Text style={[styles.companyInfoName, styles.boldText]}>{company.name}</Text>
      <Text style={styles.companyInfoName}>{company.address_line1}</Text>
      <Text style={styles.companyInfoName}>
        {company.postal_code} {company.city}
      </Text>
      <Text style={styles.companyInfo}>SIRET : {company.siret}</Text>
      <Text style={styles.companyInfo}>Code APE : {company.code_ape}</Text>
      <Text style={styles.companyInfo}>Convention : {company.collective_convention}</Text>
    </View>
    <View style={styles.rightTopContainerColumn}>
      <Text style={[styles.userInfoName, styles.boldText]}>
        {user.first_name} {user.last_name.toUpperCase()}
      </Text>
      <Text style={styles.userInfoName}>{user.address_line1}</Text>
      <Text style={styles.userInfoName}>
        {user.postal_code} {user.city}
      </Text>
      <View style={styles.userInformationContainer}>
        <View style={styles.topColumnUserInfo}>
          <Text style={styles.userInfo}>Poste : {user.job_title}</Text>
          <Text style={styles.userInfo}>Département : {user.job_department}</Text>
          <Text style={styles.userInfo}>
            Date d'embauche : {format(new Date(user.hire_date), 'dd/MM/yyyy')}
          </Text>
        </View>
        <View style={styles.topColumnUserInfo}>
          <Text style={styles.userInfo}>E-mail : {user.email}</Text>
          <Text style={styles.userInfo}>Téléphone : {user.phone_number}</Text>
        </View>
      </View>
    </View>
  </View>
);

export default EnterpriseAndUserInfo;
