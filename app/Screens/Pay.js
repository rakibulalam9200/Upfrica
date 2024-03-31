import React from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { View } from 'react-native';

export default function Pay() {
  return (
    <View style={{ flex: 1 }}>
      <Paystack  
        paystackKey="your-public-key-here"
        amount={'25000.00'}
        billingEmail="paystackwebview@something.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        autoStart={true}
      />
    </View>
  );
}