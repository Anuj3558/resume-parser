import React from 'react';

export const Chart = ({ data, title, type }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      
      {type === 'bar' ? (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${item.color}`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="relative h-48 w-48">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {data.map((item, index) => {
                const total = data.reduce((sum, d) => sum + d.value, 0);
                const startAngle = data
                  .slice(0, index)
                  .reduce((sum, d) => sum + (d.value / total) * 360, 0);
                const angle = (item.value / total) * 360;
                
                return (
                  <div
                    key={index}
                    className={item.color}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      transform: `rotate(${startAngle}deg)`,
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle * Math.PI) / 180)}% ${
                        50 - 50 * Math.sin((angle * Math.PI) / 180)
                      }%, 50% 50%)`,
                    }}
                  ></div>
                );
              })}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full h-24 w-24"></div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};