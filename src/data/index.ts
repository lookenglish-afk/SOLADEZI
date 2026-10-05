import { UnitData } from '../types/index.ts';
import { unit1Data } from './units/unit1.ts';
import { unit2Data } from './units/unit2.ts';
import { unit3Data } from './units/unit3.ts';
import { unit4Data } from './units/unit4.ts';
import { unit5Data } from './units/unit5.ts';
import { unit6Data } from './units/unit6.ts';
import { unit7Data } from './units/unit7.ts';
import { unit8Data } from './units/unit8.ts';

export const allUnits: UnitData[] = [
  unit1Data,
  unit2Data,
  unit3Data,
  unit4Data,
  unit5Data,
  unit6Data,
  unit7Data,
  unit8Data
];

export const sampleTeacherWordList = `
network administrator	quản trị viên mạng	Mahmoud is our network administrator; his job is to support you.
software developer	lập trình viên phần mềm	Karl designs and develops high-performance computer games.
motherboard	bo mạch chủ	The CPU and RAM are installed directly onto the motherboard.
power supply unit	bộ nguồn máy tính	Make sure the power supply unit is properly plugged in.
data validation	xác thực làm sạch dữ liệu	Validation cleans the data and double-checks for faults and inconsistencies.
cloud computing	điện toán đám mây	Cloud computing allows colleagues to share resources over the Internet.
repeater	bộ khuếch đại tín hiệu mạng	A repeater forwards the wireless signal to access points and increases range.
multimeter	đồng hồ vạn năng	A multimeter measures voltage, current, and electrical resistance.
anti-static wrist strap	vòng tay chống tĩnh điện	Wear an anti-static wrist strap to protect delicate circuits from ESD.
spyware	phần mềm gián điệp	Spyware sends confidential computer usage information without consent.
`.trim();
