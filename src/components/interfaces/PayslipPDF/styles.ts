import { Font, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'Lato',
  fonts: [
    { src: '/fonts/Lato-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Lato-Bold.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  boldText: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
  },
  normalText: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
  },
  page: {
    padding: 30,
  },
  topSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  middleSectionContainer: {
    flexDirection: 'row',
  },
  middleTextContainer: {
    fontSize: 12,
    paddingTop: 6,
    marginLeft: 200,
  },
  leaveRequestContainer: {
    width: '35%',
  },

  leaveRequestRow: {
    flexDirection: 'row',
    border: '0.5px solid black',
  },
  leaveRequestCell: {
    padding: 5,
    textAlign: 'center',
    fontSize: 10,
    border: '0.6px solid black',
  },
  leaveRequestText: {
    fontSize: 10,
    paddingBottom: 5,
    margin: 5,
  },
  leaveRequestHeaderCell: {
    flex: 2,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
  },
  leaveRequestHeaderCell2: {
    flex: 2,
    fontWeight: 'bold',
  },
  // SALAIRE NET AVANT IMPOT SUR LE REVENU
  leaveRequestContainer1: {
    paddingTop: 15,
    width: '100%',
  },
  leaveRequestHeaderCell3: {
    flex: 4,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
  },
  leaveRequestHeaderCell4: {
    flex: 1,
    paddingTop: 6,
    fontWeight: 'bold',
  },

  paySlipsTitle: {
    fontSize: 14,
  },
  payPeriodTitle: {
    fontSize: 12,
  },
  rightTopContainerColumn: {
    width: '60%',
    border: '1px solid black',
    padding: 7.5,
  },
  enterpriseInformationContainer: {
    width: '35%',
    border: '1px solid black',
    padding: 10,
  },
  companyInfo: {
    fontSize: 9,
    marginTop: 5,
  },
  companyInfoName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 9,
    marginBottom: 5,
    textAlign: 'left',
  },
  userInfoName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userInformationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },

  topColumnUserInfo: {
    width: '50%',
    fontSize: 9,
  },
  spaceBetween5: {
    marginTop: 5,
  },
  spaceBetween30: {
    marginTop: 15,
  },
  // pay slip
  paySlipContainer: {
    fontSize: 10,
    flexDirection: 'column',
    border: '0.1px solid black',
    width: '100%',
    height: '38vh',
  },
  paySlipContainer2: {
    fontSize: 10,
    flexDirection: 'column',
    border: '0.1px solid black',
    width: '100%',
    height: '4vh',
  },

  paySlipRow1: {
    flexDirection: 'row',
    borderBottom: '0.1px solid black',
    borderLeft: 'none',
    borderRight: 'none',
    alignItems: 'stretch',
  },
  paySlipRow: {
    flexDirection: 'row',
  },
  paySlipCell: {
    borderRight: '0.3px solid black',
    borderBottom: 'none',
    paddingLeft: 8,
    paddingRight: 5,
    paddingTop: 1,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paySlipCellCotisation: {
    backgroundColor: '#f0f0f0',
    borderRight: '0.3px solid black',
    // border: '0.3px solid black',
    borderBottom: 'none',
    paddingLeft: 8,
    paddingRight: 5,
    paddingTop: 1,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paySlipHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  paySlipColCotisation: {
    flex: 4,
    height: 30,
    display: 'flex',
    alignItems: 'stretch',
  },
  paySlipColAssiette: {
    flex: 3,
    display: 'flex',
    alignItems: 'stretch',
  },
  paySlipColPart: {
    flex: 4,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'stretch',
  },
  paySlipColInner: {
    flex: 1,
    flexDirection: 'row',
    // border: '0.3px solid black',
    borderRight: '0.3px solid black',
  },
  paySlipColInnerLast: {
    borderBottom: 'none',
  },
  paySlipColSmall: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paySlipHeader1: {
    backgroundColor: '#f0f0f0',
  },
  paySlipCellText: {
    fontSize: 10,
    textAlign: 'left',
    padding: 0,
    margin: 0,
  },
  leaveRequestContainerTax: {
    paddingTop: 10,
    width: '100%',
  },
  leaveRequestRowTax: {
    flexDirection: 'row',
    border: '0.5px solid black',
  },
  leaveRequestCellTax: {
    padding: 3,
    textAlign: 'center',
    fontSize: 8,
    border: '0.6px solid black',
    borderBottom: 'none',
  },

  footerContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 30,
    textAlign: 'center',
    padding: 10,
    fontSize: 10,
    backgroundColor: '#f8f8f8',
  },
  footerText: {
    marginBottom: 5,
    color: '#333',
  },
  footerLink: {
    color: '#1a73e8',
    textDecoration: 'underline',
  },
});

export { styles };
