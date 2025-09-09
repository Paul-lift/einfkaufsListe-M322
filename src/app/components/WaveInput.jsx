'use client';

import React, { useId } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function WaveInput({
  label = 'Label',
  type = 'text',
  name,
  id,
  required = false,
  value,
  onChange,
  placeholder = '',
  disabled = false,
  className,
  width = '240px',
  autoComplete,
}) {
  const rid = useId();
  const inputId = id || name || rid;

  return (
    <StyledWrapper className={className} $width={width}>
      <div className="wave-group">
        <input
          id={inputId}
          name={name}
          required={required}
          type={type}
          className="input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
        />

        <span className="bar" />

        <label className="label" htmlFor={inputId}>
          {Array.from(label).map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              className="label-char"
              style={{ ['--index']: i }}
            >
              {ch}
            </span>
          ))}
        </label>
      </div>
    </StyledWrapper>
  );
}

WaveInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.string,
  autoComplete: PropTypes.string,
};

const StyledWrapper = styled.div`
  .wave-group {
    position: relative;
  }

  .wave-group .input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: ${(p) => p.$width};
    border: none;
    border-bottom: 1px solid #515151;
    background: transparent;
    color: inherit;
  }

  .wave-group .input:focus {
    outline: none;
  }

  .wave-group .label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    display: flex;
    gap: 0.5px;
    line-height: 1;
  }

  .wave-group .label-char {
    transition: 0.2s ease all;
    transition-delay: calc(var(--index) * 0.05s);
  }

  .wave-group .input:focus ~ label .label-char,
  .wave-group .input:valid ~ label .label-char {
    transform: translateY(-20px);
    font-size: 14px;
    color: #5264ae;
  }

  .wave-group .bar {
    position: relative;
    display: block;
    width: ${(p) => p.$width};
  }

  .wave-group .bar:before,
  .wave-group .bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #5264ae;
    transition: 0.2s ease all;
  }

  .wave-group .bar:before {
    left: 50%;
  }

  .wave-group .bar:after {
    right: 50%;
  }

  .wave-group .input:focus ~ .bar:before,
  .wave-group .input:focus ~ .bar:after {
    width: 50%;
  }
`;

export default WaveInput;
