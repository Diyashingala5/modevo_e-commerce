import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkImportTool = ({ onImportProducts }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResults, setImportResults] = useState(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFile(e?.target?.files?.[0]);
    }
  };

  const handleFile = (file) => {
    if (file?.type === 'text/csv' || file?.name?.endsWith('.csv')) {
      setUploadedFile(file);
      setImportResults(null);
    } else {
      alert('Please upload a CSV file only.');
    }
  };

  const processImport = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock import results
      const mockResults = {
        total: 150,
        successful: 142,
        failed: 8,
        errors: [
          { row: 15, error: 'Invalid price format' },
          { row: 23, error: 'Missing required field: name' },
          { row: 45, error: 'Duplicate SKU' },
          { row: 67, error: 'Invalid category' },
          { row: 89, error: 'Image URL not accessible' },
          { row: 101, error: 'Invalid stock quantity' },
          { row: 123, error: 'Price exceeds maximum limit' },
          { row: 134, error: 'Description too long' }
        ]
      };

      setImportResults(mockResults);
      
      if (onImportProducts) {
        onImportProducts(mockResults);
      }
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `name,description,sku,category,price,stock,status,image_url,tags,weight,dimensions
"Sample Product 1","High-quality product description","SKU-001","electronics",29.99,100,"active","https://example.com/image1.jpg","electronics,gadget",1.5,"10x5x2"
"Sample Product 2","Another great product","SKU-002","clothing",49.99,50,"active","https://example.com/image2.jpg","clothing,fashion",0.8,"12x8x1"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-import-template.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const resetImport = () => {
    setUploadedFile(null);
    setImportResults(null);
    setIsProcessing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Upload" size={20} className="text-primary" />
          <span>Bulk Import</span>
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Import multiple products from CSV file
        </p>
      </div>
      <div className="p-4 space-y-4">
        {!importResults ? (
          <>
            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-smooth ${
                dragActive 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Icon 
                name="FileText" 
                size={48} 
                className={`mx-auto mb-4 ${dragActive ? 'text-primary' : 'text-muted-foreground'}`} 
              />
              
              {uploadedFile ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    {uploadedFile?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(uploadedFile?.size / 1024)?.toFixed(1)} KB
                  </p>
                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <Button
                      variant="default"
                      onClick={processImport}
                      loading={isProcessing}
                      iconName="Upload"
                      iconPosition="left"
                    >
                      {isProcessing ? 'Processing...' : 'Import Products'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetImport}
                      disabled={isProcessing}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Drop your CSV file here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports CSV files up to 10MB
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileInput}
                    className="hidden"
                    id="csv-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('csv-upload')?.click()}
                    iconName="FolderOpen"
                    iconPosition="left"
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>

            {/* Template Download */}
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Need a template?</h4>
                  <p className="text-xs text-muted-foreground">
                    Download our CSV template with sample data
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadTemplate}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download Template
                </Button>
              </div>
            </div>

            {/* Import Guidelines */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Import Guidelines:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• CSV file must include headers: name, sku, category, price, stock</li>
                <li>• Maximum 1000 products per import</li>
                <li>• Images should be accessible URLs</li>
                <li>• SKUs must be unique across all products</li>
                <li>• Price format: decimal numbers (e.g., 29.99)</li>
              </ul>
            </div>
          </>
        ) : (
          /* Import Results */
          (<div className="space-y-4">
            <div className="text-center">
              <Icon 
                name="CheckCircle" 
                size={48} 
                className="text-success mx-auto mb-4" 
              />
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Import Completed
              </h4>
            </div>
            {/* Results Summary */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {importResults?.total}
                </div>
                <div className="text-xs text-muted-foreground">Total Rows</div>
              </div>
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">
                  {importResults?.successful}
                </div>
                <div className="text-xs text-muted-foreground">Successful</div>
              </div>
              <div className="text-center p-3 bg-destructive/10 rounded-lg">
                <div className="text-2xl font-bold text-destructive">
                  {importResults?.failed}
                </div>
                <div className="text-xs text-muted-foreground">Failed</div>
              </div>
            </div>
            {/* Error Details */}
            {importResults?.errors?.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">
                  Import Errors ({importResults?.errors?.length}):
                </h5>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {importResults?.errors?.map((error, index) => (
                    <div key={index} className="text-xs bg-destructive/10 text-destructive p-2 rounded">
                      Row {error?.row}: {error?.error}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                onClick={resetImport}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Import Another File
              </Button>
            </div>
          </div>)
        )}
      </div>
    </div>
  );
};

export default BulkImportTool;