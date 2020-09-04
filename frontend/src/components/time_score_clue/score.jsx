import React from 'react';
import styled from 'styled-components';

const formatScore = score => score ? score : '0';

export const Score = ({ score }) => {
    return (
        <div>
            {`Score: ${formatScore(score)}`}
        </div>
    )
}