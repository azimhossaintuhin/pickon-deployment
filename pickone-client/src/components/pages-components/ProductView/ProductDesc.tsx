import React from "react";

interface ProductDescProps {
    desc?: string;
}

const ProductDesc: React.FC<ProductDescProps> = ({desc}) => {
    return (
        <div className="mt-6 bg-gray-50 rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                        clipRule="evenodd"
                    />
                </svg>
                Product Description
            </h3>
            <div className="space-y-2.5 text-sm text-gray-600">{desc}</div>
        </div>
    );
};

export default ProductDesc;
