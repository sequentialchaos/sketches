const l_systems = [
  {
    name: 'Penrose',
    axiom: '[B]++[B]++[B]++[B]++[B]',
    rules: {
      A: 'CF++DF----BF[-CF----AF]++',
      B: '+CF--DF[---AF--BF]+',
      C: '-AF++BF[+++CF++DF]-',
      D: '--CF++++AF[+DF++++BF]--BF',
      F: ''
    },
    len: 40,
    angle: 36,
    max_iterations: 5,
    len_ratio: 0.12
  },
  {
    name: 'Hilbert',
    axiom: 'L', 
    rules: {
      L: '+RF-LFL-FR+',
      R: '-LF+RFR+FL-',
    },
    len: 80,
    angle: 90,
    max_iterations: 6,
    len_ratio: 0.1
  }
]