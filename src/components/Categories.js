'use client'

export default function Categories({ categories, selectedCategoryId, onSelectCategory }) {
  return (
    <ul className="categories-list">
      {categories.map(cat => (
        <li
          key={cat.id}
          className={selectedCategoryId === cat.id ? 'active' : ''}
          onClick={() => onSelectCategory(cat.id)}
          style={{ cursor: 'pointer', padding: '8px', userSelect: 'none' }}
        >
          {cat.name}
        </li>
      ))}
    </ul>
  )
}
