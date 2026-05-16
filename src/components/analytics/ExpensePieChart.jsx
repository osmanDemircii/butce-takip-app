import {
  PieChart, Pie, Cell, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";
import "../../styles/pieChart.css";

const COLORS = [
  "#00c896", "#ff4d6d", "#00b4d8", "#ff6b35",
  "#9c27b0", "#4caf50", "#ffc107", "#e91e63",
];

const RADIAN = Math.PI / 180;

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x} y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`%${(percent * 100).toFixed(0)}`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="pie-tooltip">
      <span className="pie-tooltip__name">{name}</span>
      <span className="pie-tooltip__value">
        ₺{Number(value).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
};

const ExpensePieChart = ({ transactions }) => {
  // Kategoriye göre topla
  const dataMap = {};
  transactions.forEach(({ category, amount }) => {
    dataMap[category] = (dataMap[category] || 0) + amount;
  });

  const data = Object.entries(dataMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) {
    return (
      <div className="pie-empty">
        <span>📊</span>
        <p>Bu dönemde gösterilecek veri yok</p>
      </div>
    );
  }

  return (
    <div className="pie-container">
      <h3 className="pie-title">Harcama Dağılımı</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={50}
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={CustomLabel}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Kategori listesi */}
      <div className="pie-legend">
        {data.map(({ name, value }, i) => (
          <div key={name} className="pie-legend__item">
            <div
              className="pie-legend__dot"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="pie-legend__name">{name}</span>
            <span className="pie-legend__value">
              ₺{Number(value).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensePieChart;