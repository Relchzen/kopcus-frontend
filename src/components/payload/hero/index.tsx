import React from 'react'
import HighImpact from './HighImpact'
import MediumImpact from './MediumImpact'
import LowImpact from './LowImpact'

const heroes = {
    highImpact: HighImpact,
    mediumImpact: MediumImpact,
    lowImpact: LowImpact,
}

export const Hero: React.FC<any> = (props) => {
    const { hero } = props || {}

    if (!hero || !hero.type || !heroes[hero.type as keyof typeof heroes]) {
        return null
    }

    const HeroComponent = heroes[hero.type as keyof typeof heroes]

    return <HeroComponent { ...props } />
}
