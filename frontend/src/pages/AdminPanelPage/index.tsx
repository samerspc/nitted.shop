import React, { useState, useEffect, useRef } from 'react';
import { productApi } from '../../shared/api/productApi';
import { IProduct } from '../../entities/Product/types/Product';
import { objectStorageApi } from '../../shared/api/objectStorageApi';

const AdminPanelPage: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productApi.getAllProducts();
            setProducts(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await productApi.deleteProduct(id);
            fetchProducts(); // Refresh the list after deletion
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const handleEdit = (product: IProduct) => {
        setEditingProduct(product);
    };

    const handleSaveProduct = async (
        product: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'> | IProduct,
    ) => {
        try {
            if ('_id' in product && product._id) {
                await productApi.updateProduct(product._id, product);
            } else {
                await productApi.createProduct(
                    product as Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>,
                );
            }
            setEditingProduct(null);
            fetchProducts();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const handleIncrementRating = async (id: string) => {
        try {
            await productApi.incrementProductRating(id);
            fetchProducts();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '100px' }}>
            <h1>Admin Panel</h1>
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <ProductForm
                product={editingProduct}
                onSave={handleSaveProduct}
                onCancel={() => setEditingProduct(null)}
            />

            <h2>Current Products</h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '20px',
                }}
            >
                {products.map((product) => (
                    <div
                        key={product._id}
                        style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}
                    >
                        {product.images && product.images.length > 0 && (
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: 150,
                                    objectFit: 'cover',
                                    borderRadius: 6,
                                    marginBottom: 10,
                                }}
                            />
                        )}
                        <h3>{product.name}</h3>
                        <p>Brand: {product.brand}</p>
                        <p>Price: ${product.price}</p>
                        <p>Rating: {product.rating}</p>
                        <p>In Stock: {product.inStock ? 'Yes' : 'No'}</p>
                        <p>Sizes EU: {product.sizesEu.join(', ')}</p>
                        <p>Sizes US: {product.sizesUs.join(', ')}</p>
                        <p>Sizes MM: {product.sizesMm.join(', ')}</p>
                        <div style={{ marginTop: '10px' }}>
                            <button
                                onClick={() => handleEdit(product)}
                                style={{ marginRight: '10px' }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(product._id!)}
                                style={{
                                    marginRight: '10px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                }}
                            >
                                Delete
                            </button>
                            <button onClick={() => handleIncrementRating(product._id!)}>
                                + Rating
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface ProductFormProps {
    product: IProduct | null;
    onSave: (product: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'> | IProduct) => void;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>>({
        name: product?.name || '',
        brand: product?.brand || '',
        images: product?.images || [],
        inStock: product?.inStock ?? true,
        sizesEu: product?.sizesEu || [],
        sizesUs: product?.sizesUs || [],
        sizesMm: product?.sizesMm || [],
        rating: product?.rating || 0,
        price: product?.price || 0,
        gender: product?.gender || 'male',
    });
    const [uploading, setUploading] = useState(false);
    const [localPreviews, setLocalPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                brand: product.brand,
                images: product.images,
                inStock: product.inStock,
                sizesEu: product.sizesEu,
                sizesUs: product.sizesUs,
                sizesMm: product.sizesMm,
                rating: product.rating,
                price: product.price,
                gender: product.gender,
            });
        } else {
            setFormData({
                name: '',
                brand: '',
                images: [],
                inStock: true,
                sizesEu: [],
                sizesUs: [],
                sizesMm: [],
                rating: 0,
                price: 0,
                gender: 'male',
            });
        }
    }, [product]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // Обычный выбор файлов
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleFileChange called', e.target.files);
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
    };

    // Основная функция для обработки файлов
    const handleFiles = (files: File[]) => {
        console.log('handleFiles called', files);
        // Предпросмотр до загрузки
        const previews = files.map((file) => URL.createObjectURL(file));
        setLocalPreviews((prev) => [...prev, ...previews]);
        uploadFiles(files, previews);
    };

    // Загрузка файлов
    const uploadFiles = async (files: File[], previews: string[]) => {
        console.log('uploadFiles called', files);
        setUploading(true);
        try {
            const urls: string[] = [];
            for (const file of files) {
                const url = await objectStorageApi.uploadImage(file);
                urls.push(url);
            }
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...urls],
            }));
        } finally {
            setLocalPreviews((prev) => prev.filter((p) => !previews.includes(p)));
            setUploading(false);
        }
    };

    // Удаление картинки из формы и из Object Storage
    const handleRemoveImage = async (url: string) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((img) => img !== url),
        }));
        try {
            await objectStorageApi.deleteImage(url);
        } catch {
            alert('Ошибка при удалении изображения из Object Storage');
        }
    };

    // Удаление локального превью (до загрузки)
    const handleRemovePreview = (preview: string) => {
        setLocalPreviews((prev) => prev.filter((p) => p !== preview));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value.split(',').map((item) => item.trim()),
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(product ? { ...formData, _id: product._id } : formData);
        console.log(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                marginBottom: '30px',
                padding: '20px',
                border: '1px solid #eee',
                borderRadius: '8px',
            }}
        >
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Images:</label>
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{
                        border: '2px dashed #aaa',
                        borderRadius: 8,
                        padding: 16,
                        textAlign: 'center',
                        marginBottom: 8,
                        background: uploading ? '#f9f9f9' : undefined,
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        console.log('Drop area clicked, opening file dialog');
                        fileInputRef.current?.click();
                    }}
                >
                    {uploading ? 'Загрузка...' : 'Перетащите файлы сюда или кликните для выбора'}
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                </div>
                {/* Предпросмотр до загрузки */}
                {localPreviews.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        {localPreviews.map((preview) => (
                            <div key={preview} style={{ position: 'relative' }}>
                                <img
                                    src={preview}
                                    alt="preview"
                                    style={{
                                        width: 60,
                                        height: 60,
                                        objectFit: 'cover',
                                        borderRadius: 4,
                                        opacity: 0.7,
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemovePreview(preview)}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        background: 'red',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: 20,
                                        height: 20,
                                        cursor: 'pointer',
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {/* Уже загруженные картинки */}
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    {formData.images.map((url) => (
                        <div key={url} style={{ position: 'relative' }}>
                            <img
                                src={url}
                                alt="preview"
                                style={{
                                    width: 60,
                                    height: 60,
                                    objectFit: 'cover',
                                    borderRadius: 4,
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(url)}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    background: 'red',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: 20,
                                    height: 20,
                                    cursor: 'pointer',
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Brand:</label>
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ marginRight: '10px' }}>In Stock:</label>
                <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    Sizes EU (comma-separated):
                </label>
                <input
                    type="text"
                    name="sizesEu"
                    value={formData.sizesEu.join(', ')}
                    onChange={handleArrayChange}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    Sizes US (comma-separated):
                </label>
                <input
                    type="text"
                    name="sizesUs"
                    value={formData.sizesUs.join(', ')}
                    onChange={handleArrayChange}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                    Sizes MM (comma-separated):
                </label>
                <input
                    type="text"
                    name="sizesMm"
                    value={formData.sizesMm.join(', ')}
                    onChange={handleArrayChange}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Rating:</label>
                <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Gender:</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleSelectChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                >
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                </select>
            </div>
            <button type="submit" style={{ marginRight: '10px' }}>
                {product ? 'Save Changes' : 'Add Product'}
            </button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default AdminPanelPage;
