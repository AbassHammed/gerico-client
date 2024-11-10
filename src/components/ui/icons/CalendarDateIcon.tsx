import { SVGProps } from 'react';

interface CalendarDateIconProps extends SVGProps<SVGSVGElement> {
  date?: string;
  month?: string;
  strokeWidth?: number;
  size?: number;
}

export default function CalendarDateIcon({
  date = '20',
  month = 'AUG',
  strokeWidth = 1,
  size = 24,
  ...props
}: CalendarDateIconProps) {
  const width = size;
  const height = size;
  const padding = strokeWidth;
  const fontSize = Math.floor(width / 3);
  const lineY = height * 0.6;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <rect
        x={padding / 2}
        y={padding / 2}
        width={width - padding}
        height={height - padding}
        rx={2}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <line
        x1={padding / 2}
        y1={lineY}
        x2={width - padding / 2}
        y2={lineY}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <text
        x="50%"
        y={lineY / 2}
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="middle"
        fill="currentColor"
        dominantBaseline="central">
        {date}
      </text>
      <text
        x="50%"
        y={lineY + (height - lineY) / 2}
        fontSize={fontSize * 0.7}
        fontWeight="normal"
        textAnchor="middle"
        fill="currentColor"
        dominantBaseline="central">
        {month}
      </text>
    </svg>
  );
}
