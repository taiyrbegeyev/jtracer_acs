import React from 'react';
import PropTypes from 'prop-types';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventName: {
    fontSize: '60px'
  },
  checkIn: {
    fontSize: '36px'
  },
  qrCode: {
    width: 400,
    height: 400
  },
  instructions: {
    fontSize: '18px',
    fontWeight: '200'
  },
  distance: {
    marginBottom: 10
  }
});

const RenderPDF = ({ eventName, qrCode }) => {
  return (
    <Document author="JTracer">
      <Page size="A4" style={styles.page}>
        <View style={styles.page}>
          <Text style={styles.eventName}>{eventName}</Text>
          <Text style={styles.checkIn}>Check In</Text>
        </View>
        <View style={styles.qrCode}>
          <Image src={qrCode} />
        </View>
        <View style={{ ...styles.page, ...styles.instructions }}>
          <Text style={styles.distance}>
            Bitte scannen Sie diesen QR Code beim Betreten des Raumes.
          </Text>
          <Text>Please scan this QR Code when entering the room.</Text>
        </View>
      </Page>
    </Document>
  );
};

RenderPDF.propTypes = {
  eventName: PropTypes.string.isRequired,
  qrCode: PropTypes.string.isRequired
};

export default RenderPDF;
