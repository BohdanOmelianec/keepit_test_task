import React from 'react';
import { Breadcrumbs, Chip } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';
import { useCollection } from '../../context/CollectionContext';

function Navigation() {
  const { pathnames } = useCollection();
  
  return (
    <Breadcrumbs maxItems={5} separator="›" aria-label="breadcrumb" sx={{ px: 2, pt: 1 }}>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames
          .slice(0, index + 1)
          .map((x) => x.replaceAll(' ', '-'))
          .join('/')}`;

        return last ? (
          <Chip
            icon={<FolderIcon />}
            key={to}
            sx={{ mb: 1, mt: 1 }}
            label={value}
            color="info"
          />
        ) : (
          <Link to={to} key={to}>
            <Chip icon={<FolderIcon />} sx={{ mb: 1, mt: 1 }} label={value} />
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default Navigation;
