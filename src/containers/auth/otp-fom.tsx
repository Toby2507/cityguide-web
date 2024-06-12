'use client';

import PinInput from 'react-pin-input';

const OtpForm = () => {
  return (
    <div>
      <PinInput
        length={6}
        focus
        onChange={(value, index) => {
          console.log({ value, index });
        }}
        type="numeric"
        inputMode="number"
        inputStyle={styles.inputBox}
        inputFocusStyle={styles.inputBoxFocus}
        onComplete={(value, index) => {
          console.log({ value, index });
        }}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
    </div>
  );
};

export default OtpForm;

const styles = {
  inputBox: {
    borderRadius: '10px',
    marginRight: '15px',
    boxShadow: '0 0 10px 2px rgba(0, 0, 0, 0.1)',
    width: '60px',
    height: '60px',
    fontSize: '1.75rem',
    fontWeight: 'normal',
    color: '#898888',
  },
  inputBoxFocus: {
    boxShadow: '0 0 10px 2px rgba(0, 117, 255, .3)',
  },
};
