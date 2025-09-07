'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Info, 
  Settings, 
  Package, 
  FolderOpen, 
  Mail, 
  LogOut, 
  User, 
  Edit, 
  Save, 
  X, 
  Upload, 
  Image as ImageIcon,
  RefreshCw,
  Server,
  Activity,
  Newspaper,
  Clock,
  Plus,
  Trash2,
  Move
} from 'lucide-react';

// Interfaces
interface AdminUser {
  id: string;
  username: string;
  role: string;
  lastLogin: string;
}

interface NewsArticle {
  _id: string;
  title: string;
  excerpt: string;
  fullContent: string;
  image: string;
  date: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  _id: string;
  title: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BackgroundImage {
  id: string;
  url: string;
  alt: string;
  sortOrder?: number;
}

interface PageContent {
  [key: string]: {
    description: string;
    pageName: string;
  };
}

interface BackgroundImages {
  [key: string]: BackgroundImage[];
}

interface ContactContent {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
}

interface ProjectStats {
  _id: string;
  statKey: string;
  statLabel: string;
  statValue: string;
  sortOrder: number;
}

interface GlobalOffice {
  _id: string;
  title: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  isActive: boolean;
  sortOrder: number;
}

export default function AdminPage() {
  // Auth states
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  // Content states
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageContent, setPageContent] = useState<PageContent>({});
  const [backgroundImages, setBackgroundImages] = useState<BackgroundImages>({});
  const [projectStats, setProjectStats] = useState<ProjectStats[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);
  const [globalOffices, setGlobalOffices] = useState<GlobalOffice[]>([]);
  const [officesLoading, setOfficesLoading] = useState(false);
  const [editingOffice, setEditingOffice] = useState<GlobalOffice | null>(null);
  const [isOfficeDialogOpen, setIsOfficeDialogOpen] = useState(false);
  
  const [contactContent, setContactContent] = useState<ContactContent>({
    address: '123 Business St, City, State 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@danielsengineering.com',
    workingHours: 'Monday - Friday: 8:00 AM - 6:00 PM'
  });
  
  // Modal states
  const [newsLoading, setNewsLoading] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [pageContentLoading, setPageContentLoading] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewsDialogOpen, setIsNewsDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  
  // File upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [projectSelectedFile, setProjectSelectedFile] = useState<File | null>(null);
  const [projectImagePreview, setProjectImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectFileInputRef = useRef<HTMLInputElement>(null);

  // Background image upload states
  const [backgroundFileInputs, setBackgroundFileInputs] = useState<{[key: string]: React.RefObject<HTMLInputElement>}>({
    home: useRef<HTMLInputElement>(null),
    about: useRef<HTMLInputElement>(null),
    services: useRef<HTMLInputElement>(null),
    equipment: useRef<HTMLInputElement>(null),
    projects: useRef<HTMLInputElement>(null),
    contact: useRef<HTMLInputElement>(null)
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState('home');

  // Auth functions
  const getAuthToken = () => {
    return localStorage.getItem('adminToken');
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const verifyToken = async () => {
    const token = getAuthToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        logout();
        return;
      }

      const data = await response.json();
      setUser(data.admin);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Data fetching functions
  const fetchPageContent = async () => {
    setPageContentLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/page-content`);

      if (response.ok) {
        const data = await response.json();
        setPageContent(data.pageContent || {});
        setBackgroundImages(data.backgroundImages || {});
      }
    } catch (err) {
      console.error('Error fetching page content:', err);
    } finally {
      setPageContentLoading(false);
    }
  };

  const fetchNews = async () => {
    setNewsLoading(true);
    const token = getAuthToken();
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/admin/news`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const newsData = await response.json();
        setNews(newsData);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setNewsLoading(false);
    }
  };

  const fetchProjects = async () => {
    setProjectsLoading(true);
    const token = getAuthToken();
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/admin/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const projectsData = await response.json();
        setProjects(projectsData);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setProjectsLoading(false);
    }
  };

  const fetchProjectStats = async () => {
    setStatsLoading(true);
    const token = getAuthToken();
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/projects/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const statsData = await response.json();
        setProjectStats(statsData);
      }
    } catch (err) {
      console.error('Error fetching project stats:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchGlobalOffices = async () => {
    setOfficesLoading(true);
    const token = getAuthToken();
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/offices`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const officesData = await response.json();
        setGlobalOffices(officesData);
      }
    } catch (err) {
      console.error('Error fetching global offices:', err);
    } finally {
      setOfficesLoading(false);
    }
  };

  // Save functions
  const savePageDescription = async (pageKey: string) => {
    setSaveLoading(true);
    const token = getAuthToken();
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/page-content/${pageKey}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: pageContent[pageKey]?.description || '',
          pageName: pageContent[pageKey]?.pageName || pageKey.charAt(0).toUpperCase() + pageKey.slice(1)
        }),
      });

      if (response.ok) {
        alert('Page description saved successfully!');
      } else {
        alert('Failed to save page description');
      }
    } catch (err) {
      console.error('Error saving page description:', err);
      alert('Failed to save page description');
    } finally {
      setSaveLoading(false);
    }
  };

  const saveContactInfo = async () => {
    setSaveLoading(true);
    const token = getAuthToken();
    if (!token) return;

    try {
      // For now, we'll save to localStorage since contact info endpoint doesn't exist yet
      localStorage.setItem('contactContent', JSON.stringify(contactContent));
      alert('Contact information saved successfully!');
    } catch (err) {
      console.error('Error saving contact info:', err);
      alert('Failed to save contact information');
    } finally {
      setSaveLoading(false);
    }
  };

  const saveNews = async (article: NewsArticle) => {
    setSaveLoading(true);
    const token = getAuthToken();
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const formData = new FormData();
      formData.append('title', article.title);
      formData.append('excerpt', article.excerpt);
      formData.append('fullContent', article.fullContent);
      formData.append('date', article.date);
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else {
        formData.append('existingImage', article.image);
      }

      const response = await fetch(`${apiUrl}/api/admin/news/${article._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedArticle = await response.json();
        setNews(prev => prev.map(n => n._id === updatedArticle._id ? updatedArticle : n));
        setIsNewsDialogOpen(false);
        setEditingNews(null);
        setSelectedFile(null);
        setImagePreview(null);
      }
    } catch (err) {
      console.error('Error saving news:', err);
      alert('Failed to save news article');
    } finally {
      setSaveLoading(false);
    }
  };

  const saveProject = async (project: Project) => {
    setSaveLoading(true);
    const token = getAuthToken();
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const formData = new FormData();
      formData.append('title', project.title);
      
      if (projectSelectedFile) {
        formData.append('image', projectSelectedFile);
      } else {
        formData.append('existingImage', project.image);
      }

      const response = await fetch(`${apiUrl}/api/admin/projects/${project._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setProjects(prev => prev.map(p => p._id === updatedProject._id ? updatedProject : p));
        setIsProjectDialogOpen(false);
        setEditingProject(null);
        setProjectSelectedFile(null);
        setProjectImagePreview(null);
      }
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Failed to save project');
    } finally {
      setSaveLoading(false);
    }
  };

  const saveProjectStats = async (statId: string, statLabel: string, statValue: string) => {
    setSaveLoading(true);
    const token = getAuthToken();
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/projects/stats/${statId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ statLabel, statValue }),
      });

      if (response.ok) {
        const updatedStat = await response.json();
        setProjectStats(prev => prev.map(stat => stat._id === updatedStat._id ? updatedStat : stat));
        alert('Project statistic updated successfully!');
      } else {
        alert('Failed to update project statistic');
      }
    } catch (err) {
      console.error('Error updating project stat:', err);
      alert('Failed to update project statistic');
    } finally {
      setSaveLoading(false);
    }
  };

  const createProject = async () => {
    setSaveLoading(true);
    const token = getAuthToken();
    if (!token) return;

    if (!editingProject?.title) {
      alert('Project title is required');
      setSaveLoading(false);
      return;
    }

    if (!projectSelectedFile) {
      alert('Project image is required');
      setSaveLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const formData = new FormData();
      formData.append('title', editingProject.title);
      formData.append('image', projectSelectedFile);

      const response = await fetch(`${apiUrl}/api/projects`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const newProject = await response.json();
        setProjects(prev => [newProject, ...prev]);
        setIsProjectDialogOpen(false);
        setEditingProject(null);
        setProjectSelectedFile(null);
        setProjectImagePreview(null);
        alert('Project created successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to create project');
      }
    } catch (err) {
      console.error('Error creating project:', err);
      alert('Failed to create project');
    } finally {
      setSaveLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    setSaveLoading(true);
    const token = getAuthToken();
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProjects(prev => prev.filter(project => project._id !== projectId));
        alert('Project deleted successfully!');
      } else {
        alert('Failed to delete project');
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project');
    } finally {
      setSaveLoading(false);
    }
  };

  const saveGlobalOffice = async (office: GlobalOffice) => {
    setSaveLoading(true);
    const token = getAuthToken();
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/offices/${office._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: office.title,
          address: office.address,
          phone: office.phone,
          email: office.email,
          workingHours: office.workingHours
        }),
      });

      if (response.ok) {
        const updatedOffice = await response.json();
        setGlobalOffices(prev => prev.map(o => o._id === updatedOffice._id ? updatedOffice : o));
        setIsOfficeDialogOpen(false);
        setEditingOffice(null);
        alert('Office updated successfully!');
      } else {
        alert('Failed to update office');
      }
    } catch (err) {
      console.error('Error updating office:', err);
      alert('Failed to update office');
    } finally {
      setSaveLoading(false);
    }
  };

  const createGlobalOffice = async () => {
    setSaveLoading(true);
    const token = getAuthToken();
    if (!token) return;

    if (!editingOffice?.title || !editingOffice?.address || !editingOffice?.phone || !editingOffice?.email || !editingOffice?.workingHours) {
      alert('All fields are required');
      setSaveLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/offices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editingOffice.title,
          address: editingOffice.address,
          phone: editingOffice.phone,
          email: editingOffice.email,
          workingHours: editingOffice.workingHours
        }),
      });

      if (response.ok) {
        const newOffice = await response.json();
        setGlobalOffices(prev => [...prev, newOffice]);
        setIsOfficeDialogOpen(false);
        setEditingOffice(null);
        alert('Office created successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to create office');
      }
    } catch (err) {
      console.error('Error creating office:', err);
      alert('Failed to create office');
    } finally {
      setSaveLoading(false);
    }
  };

  const deleteGlobalOffice = async (officeId: string) => {
    if (!confirm('Are you sure you want to delete this office?')) return;

    setSaveLoading(true);
    const token = getAuthToken();
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/offices/${officeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setGlobalOffices(prev => prev.filter(office => office._id !== officeId));
        alert('Office deleted successfully!');
      } else {
        alert('Failed to delete office');
      }
    } catch (err) {
      console.error('Error deleting office:', err);
      alert('Failed to delete office');
    } finally {
      setSaveLoading(false);
    }
  };

  // Background image functions
  const handleBackgroundImageUpload = async (pageKey: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const token = getAuthToken();
    if (!token) return;

    setSaveLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('alt', file.name.replace(/\.[^/.]+$/, ""));

        const response = await fetch(`${apiUrl}/api/background-images/${pageKey}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to upload image');
        }

        return response.json();
      });

      await Promise.all(uploadPromises);
      
      // Refresh page content to get updated images
      await fetchPageContent();
      alert('Background image(s) uploaded successfully!');
    } catch (error) {
      console.error('Error uploading background images:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload background images');
    } finally {
      setSaveLoading(false);
      // Reset file input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const removeBackgroundImage = async (imageId: string) => {
    const token = getAuthToken();
    if (!token) return;

    setSaveLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/background-images/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Refresh page content to get updated images
        await fetchPageContent();
        alert('Background image removed successfully!');
      } else {
        alert('Failed to remove background image');
      }
    } catch (error) {
      console.error('Error removing background image:', error);
      alert('Failed to remove background image');
    } finally {
      setSaveLoading(false);
    }
  };

  const moveBackgroundImage = async (pageKey: string, imageId: string, direction: 'up' | 'down') => {
    const images = backgroundImages[pageKey] || [];
    const currentIndex = images.findIndex(img => img.id === imageId);
    
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= images.length) return;
    
    // Create new order
    const newImages = [...images];
    [newImages[currentIndex], newImages[newIndex]] = [newImages[newIndex], newImages[currentIndex]];
    
    const token = getAuthToken();
    if (!token) return;

    setSaveLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/background-images/${pageKey}/reorder`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageIds: newImages.map(img => img.id)
        }),
      });

      if (response.ok) {
        // Refresh page content to get updated images
        await fetchPageContent();
      } else {
        alert('Failed to reorder images');
      }
    } catch (error) {
      console.error('Error reordering images:', error);
      alert('Failed to reorder images');
    } finally {
      setSaveLoading(false);
    }
  };

  const updateImageAlt = async (imageId: string, newAlt: string) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/background-images/${imageId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alt: newAlt }),
      });

      if (response.ok) {
        // Update local state
        setBackgroundImages(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(pageKey => {
            updated[pageKey] = updated[pageKey].map(img => 
              img.id === imageId ? { ...img, alt: newAlt } : img
            );
          });
          return updated;
        });
      }
    } catch (error) {
      console.error('Error updating image alt text:', error);
    }
  };

  // Utility functions
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('/uploads/')) {
      return `http://localhost:5000${imagePath}`;
    }
    return imagePath;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProjectSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProjectImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Background Image Management Component
  const BackgroundImageManager = ({ pageKey, pageName }: { pageKey: string, pageName: string }) => {
    const images = backgroundImages[pageKey] || [];
    const isHomePage = pageKey === 'home';

    return (
      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Background Images</h3>
          <Button
            onClick={() => backgroundFileInputs[pageKey]?.current?.click()}
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={saveLoading}
          >
            <Upload className="h-4 w-4" />
            Add Image{isHomePage ? 's' : ''}
          </Button>
        </div>
        
        <input
          ref={backgroundFileInputs[pageKey]}
          type="file"
          accept="image/*"
          multiple={isHomePage}
          onChange={(e) => handleBackgroundImageUpload(pageKey, e)}
          className="hidden"
        />

        {isHomePage && (
          <p className="text-sm text-gray-600 mb-4">
            You can add 1-10 images for the home page carousel. Current: {images.length}/10
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={image.id} className="border rounded-lg p-4 bg-slate-50">
              <div className="mb-3">
                <img
                  src={getImageUrl(image.url)}
                  alt={image.alt}
                  className="w-full h-32 object-cover rounded"
                />
              </div>
              
              <div className="space-y-2">
                <div>
                  <Label htmlFor={`alt-${image.id}`}>Alt Text</Label>
                  <Input
                    id={`alt-${image.id}`}
                    value={image.alt}
                    onChange={(e) => updateImageAlt(image.id, e.target.value)}
                    placeholder="Enter alt text"
                    className="text-sm"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  {isHomePage && images.length > 1 && (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveBackgroundImage(pageKey, image.id, 'up')}
                        disabled={index === 0 || saveLoading}
                        className="p-1 h-8 w-8"
                      >
                        ↑
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveBackgroundImage(pageKey, image.id, 'down')}
                        disabled={index === images.length - 1 || saveLoading}
                        className="p-1 h-8 w-8"
                      >
                        ↓
                      </Button>
                    </div>
                  )}
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeBackgroundImage(image.id)}
                    className="gap-1 ml-auto"
                    disabled={saveLoading}
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No background images uploaded</p>
            <p className="text-sm">Click "Add Image{isHomePage ? 's' : ''}" to upload</p>
          </div>
        )}
      </div>
    );
  };

  // Effects
  useEffect(() => {
    verifyToken();
    // Load saved contact content from localStorage
    const savedContactContent = localStorage.getItem('contactContent');
    if (savedContactContent) {
      setContactContent(JSON.parse(savedContactContent));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchPageContent();
      fetchNews();
      fetchProjects();
      fetchProjectStats();
      fetchGlobalOffices(); // Add this line
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 border-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Website Content Management
              </h1>
              <p className="text-slate-600">
                Welcome back, {user.username}! Manage your website content here.
              </p>
            </div>
            <Button onClick={logout} variant="outline" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* User Info */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {user.username}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Role: {user.role} • Last login: {new Date(user.lastLogin).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="home" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                About
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Services
              </TabsTrigger>
              <TabsTrigger value="equipment" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Equipment
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact
              </TabsTrigger>
            </TabsList>

            {/* Home Tab */}
            <TabsContent value="home" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Home Page Content</CardTitle>
                  <CardDescription>
                    Manage home page description and background images
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pageContentLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="homePageDescription">Page Description</Label>
                        <Textarea
                          id="homePageDescription"
                          value={pageContent.home?.description || ''}
                          onChange={(e) => setPageContent(prev => ({ 
                            ...prev, 
                            home: { ...prev.home, description: e.target.value, pageName: 'Home' }
                          }))}
                          placeholder="Enter home page description"
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button onClick={() => savePageDescription('home')} disabled={saveLoading}>
                          {saveLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                          Save Changes
                        </Button>
                      </div>

                      <BackgroundImageManager pageKey="home" pageName="Home" />
                    </>
                  )}

                  {/* News Section */}
                  <div className="mt-8 pt-8 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">News Section</h3>
                      <Button onClick={fetchNews} disabled={newsLoading} variant="outline" size="sm">
                        <RefreshCw className={`h-4 w-4 ${newsLoading ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {news.map((article) => (
                        <div key={article._id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-slate-900 line-clamp-1">
                              {article.title}
                            </h4>
                          </div>
                          <div className="mb-2">
                            <img 
                              src={getImageUrl(article.image)} 
                              alt={article.title}
                              className="w-full h-32 object-cover rounded"
                            />
                          </div>
                          <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500">{article.date}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingNews({ ...article });
                                setIsNewsDialogOpen(true);
                              }}
                              className="gap-1"
                            >
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Page Content</CardTitle>
                  <CardDescription>
                    Manage about page description and background image
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pageContentLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="aboutPageDescription">Page Description</Label>
                        <Textarea
                          id="aboutPageDescription"
                          value={pageContent.about?.description || ''}
                          onChange={(e) => setPageContent(prev => ({ 
                            ...prev, 
                            about: { ...prev.about, description: e.target.value, pageName: 'About' }
                          }))}
                          placeholder="Enter about page description"
                          rows={4}
                        />
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button onClick={() => savePageDescription('about')} disabled={saveLoading}>
                          {saveLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                          Save Changes
                        </Button>
                      </div>

                      <BackgroundImageManager pageKey="about" pageName="About" />
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Services Page Content</CardTitle>
                  <CardDescription>
                    Manage services page description and background image
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pageContentLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="servicesPageDescription">Page Description</Label>
                        <Textarea
                          id="servicesPageDescription"
                          value={pageContent.services?.description || ''}
                          onChange={(e) => setPageContent(prev => ({ 
                            ...prev, 
                            services: { ...prev.services, description: e.target.value, pageName: 'Services' }
                          }))}
                          placeholder="Enter services page description"
                          rows={4}
                        />
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button onClick={() => savePageDescription('services')} disabled={saveLoading}>
                          {saveLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                          Save Changes
                        </Button>
                      </div>

                      <BackgroundImageManager pageKey="services" pageName="Services" />
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Equipment Tab */}
            <TabsContent value="equipment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment Page Content</CardTitle>
                  <CardDescription>
                    Manage equipment page description and background image
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pageContentLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="equipmentPageDescription">Page Description</Label>
                        <Textarea
                          id="equipmentPageDescription"
                          value={pageContent.equipment?.description || ''}
                          onChange={(e) => setPageContent(prev => ({ 
                            ...prev, 
                            equipment: { ...prev.equipment, description: e.target.value, pageName: 'Equipment' }
                          }))}
                          placeholder="Enter equipment page description"
                          rows={4}
                        />
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button onClick={() => savePageDescription('equipment')} disabled={saveLoading}>
                          {saveLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                          Save Changes
                        </Button>
                      </div>

                      <BackgroundImageManager pageKey="equipment" pageName="Equipment" />
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Projects Page Content</CardTitle>
                  <CardDescription>
                    Manage projects page description, background image, and project items
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pageContentLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="projectsPageDescription">Page Description</Label>
                        <Textarea
                          id="projectsPageDescription"
                          value={pageContent.projects?.description || ''}
                          onChange={(e) => setPageContent(prev => ({ 
                            ...prev, 
                            projects: { ...prev.projects, description: e.target.value, pageName: 'Projects' }
                          }))}
                          placeholder="Enter projects page description"
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button onClick={() => savePageDescription('projects')} disabled={saveLoading}>
                          {saveLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                          Save Changes
                        </Button>
                      </div>

                      <BackgroundImageManager pageKey="projects" pageName="Projects" />
                    </>
                  )}

                  {/* Projects Management */}
                  <div className="mt-8 pt-8 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Current Projects</h3>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => {
                            setEditingProject({ _id: '', title: '', image: '', isActive: true });
                            setIsProjectDialogOpen(true);
                          }} 
                          variant="default" 
                          size="sm"
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add Project
                        </Button>
                        <Button onClick={fetchProjects} disabled={projectsLoading} variant="outline" size="sm">
                          <RefreshCw className={`h-4 w-4 ${projectsLoading ? 'animate-spin' : ''}`} />
                          Refresh
                        </Button>
                      </div>
                    </div>
                    
                    {projectsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project) => (
                          <div key={project._id} className="border rounded-lg p-4 bg-slate-50">
                            <div className="mb-3">
                              <img
                                src={getImageUrl(project.image)}
                                alt={project.title}
                                className="w-full h-40 object-cover rounded"
                              />
                            </div>
                            <div className="text-center">
                              <h4 className="font-medium text-slate-900 mb-3">
                                {project.title}
                              </h4>
                              <div className="flex gap-2 justify-center">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingProject({ ...project });
                                    setIsProjectDialogOpen(true);
                                  }}
                                  className="gap-1"
                                >
                                  <Edit className="h-3 w-3" />
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteProject(project._id)}
                                  className="gap-1"
                                  disabled={saveLoading}
                                >
                                  <Trash2 className="h-3 w-3" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Statistics Management */}
                  <div className="mt-8 pt-8 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Project Statistics</h3>
                      <Button onClick={fetchProjectStats} disabled={statsLoading} variant="outline" size="sm">
                        <RefreshCw className={`h-4 w-4 ${statsLoading ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                    </div>
                    
                    {statsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projectStats.map((stat) => (
                          <div key={stat._id} className="border rounded-lg p-4 bg-slate-50">
                            <div className="space-y-3">
                              <div>
                                <Label htmlFor={`statLabel-${stat._id}`}>Label</Label>
                                <Input
                                  id={`statLabel-${stat._id}`}
                                  value={stat.statLabel}
                                  onChange={(e) => {
                                    setProjectStats(prev => prev.map(s => 
                                      s._id === stat._id ? { ...s, statLabel: e.target.value } : s
                                    ));
                                  }}
                                  placeholder="Enter statistic label"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`statValue-${stat._id}`}>Value</Label>
                                <Input
                                  id={`statValue-${stat._id}`}
                                  value={stat.statValue}
                                  onChange={(e) => {
                                    setProjectStats(prev => prev.map(s => 
                                      s._id === stat._id ? { ...s, statValue: e.target.value } : s
                                    ));
                                  }}
                                  placeholder="Enter statistic value"
                                />
                              </div>
                              <div className="flex justify-end pt-2">
                                <Button
                                  size="sm"
                                  onClick={() => saveProjectStats(stat._id, stat.statLabel, stat.statValue)}
                                  disabled={saveLoading}
                                  className="gap-1"
                                >
                                  {saveLoading ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Page Content</CardTitle>
                  <CardDescription>
                    Manage contact page description, background image, and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {pageContentLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="contactPageDescription">Page Description</Label>
                        <Textarea
                          id="contactPageDescription"
                          value={pageContent.contact?.description || ''}
                          onChange={(e) => setPageContent(prev => ({ 
                            ...prev, 
                            contact: { ...prev.contact, description: e.target.value, pageName: 'Contact' }
                          }))}
                          placeholder="Enter contact page description"
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={() => savePageDescription('contact')} disabled={saveLoading}>
                          {saveLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                          Save Page Content
                        </Button>
                      </div>

                      <BackgroundImageManager pageKey="contact" pageName="Contact" />
                    </>
                  )}

                  {/* Global Offices Management */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Global Offices</h3>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => {
                            setEditingOffice({ 
                              _id: '', 
                              title: '', 
                              address: '', 
                              phone: '', 
                              email: '', 
                              workingHours: '', 
                              isActive: true, 
                              sortOrder: 0 
                            });
                            setIsOfficeDialogOpen(true);
                          }} 
                          variant="default" 
                          size="sm"
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add Office
                        </Button>
                        <Button onClick={fetchGlobalOffices} disabled={officesLoading} variant="outline" size="sm">
                          <RefreshCw className={`h-4 w-4 ${officesLoading ? 'animate-spin' : ''}`} />
                          Refresh
                        </Button>
                      </div>
                    </div>
                    
                    {officesLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {globalOffices.map((office) => (
                          <div key={office._id} className="border rounded-lg p-4 bg-slate-50">
                            <div className="space-y-2">
                              <h4 className="font-medium text-slate-900">{office.title}</h4>
                              <p className="text-sm text-slate-600 whitespace-pre-line">{office.address}</p>
                              <p className="text-sm text-slate-600">📞 {office.phone}</p>
                              <p className="text-sm text-slate-600">✉️ {office.email}</p>
                              <p className="text-sm text-slate-600">🕒 {office.workingHours}</p>
                              <div className="flex gap-2 justify-end pt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingOffice({ ...office });
                                    setIsOfficeDialogOpen(true);
                                  }}
                                  className="gap-1"
                                >
                                  <Edit className="h-3 w-3" />
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteGlobalOffice(office._id)}
                                  className="gap-1"
                                  disabled={saveLoading}
                                >
                                  <Trash2 className="h-3 w-3" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit News Dialog */}
      <Dialog open={isNewsDialogOpen} onOpenChange={setIsNewsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit News Article</DialogTitle>
            <DialogDescription>
              Update the news article content. All fields are required.
            </DialogDescription>
          </DialogHeader>
          {editingNews && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingNews.title}
                  onChange={(e) => setEditingNews(prev => prev ? { ...prev, title: e.target.value } : null)}
                  placeholder="Enter news title"
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={editingNews.excerpt}
                  onChange={(e) => setEditingNews(prev => prev ? { ...prev, excerpt: e.target.value } : null)}
                  placeholder="Enter news excerpt"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="fullContent">Full Content</Label>
                <Textarea
                  id="fullContent"
                  value={editingNews.fullContent}
                  onChange={(e) => setEditingNews(prev => prev ? { ...prev, fullContent: e.target.value } : null)}
                  placeholder="Enter full news content"
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Choose New Image
                    </Button>
                    <span className="text-sm text-slate-500">
                      {selectedFile ? selectedFile.name : 'or keep current image'}
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="border rounded-lg p-3 bg-slate-50">
                    <div className="flex items-center gap-2 mb-2">
                      <ImageIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">Preview</span>
                    </div>
                    <img 
                      src={imagePreview || getImageUrl(editingNews.image)} 
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  value={editingNews.date}
                  onChange={(e) => setEditingNews(prev => prev ? { ...prev, date: e.target.value } : null)}
                  placeholder="Enter date"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsNewsDialogOpen(false);
                    setSelectedFile(null);
                    setImagePreview(null);
                  }}
                  disabled={saveLoading}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  onClick={() => editingNews && saveNews(editingNews)}
                  disabled={saveLoading}
                >
                  {saveLoading ? (
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-1" />
                  )}
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject?._id ? 'Edit Project' : 'Create New Project'}
            </DialogTitle>
            <DialogDescription>
              {editingProject?._id ? 'Update project information and image' : 'Add a new project to your portfolio'}
            </DialogDescription>
          </DialogHeader>
          
          {editingProject && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="projectTitle">Project Title</Label>
                <Input
                  id="projectTitle"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <Label htmlFor="projectImage">Project Image</Label>
                <div className="mt-2">
                  <input
                    ref={projectFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProjectFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => projectFileInputRef.current?.click()}
                    className="w-full h-32 border-dashed"
                  >
                    {projectImagePreview ? (
                      <img src={projectImagePreview} alt="Preview" className="h-full w-auto object-contain" />
                    ) : editingProject.image ? (
                      <img src={getImageUrl(editingProject.image)} alt="Current" className="h-full w-auto object-contain" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 mb-2" />
                        <span>Click to upload image</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsProjectDialogOpen(false);
                    setEditingProject(null);
                    setProjectSelectedFile(null);
                    setProjectImagePreview(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={editingProject._id ? () => saveProject(editingProject) : createProject}
                  disabled={saveLoading}
                >
                  {saveLoading ? (
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-1" />
                  )}
                  {editingProject._id ? 'Update Project' : 'Create Project'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Global Office Dialog */}
      <Dialog open={isOfficeDialogOpen} onOpenChange={setIsOfficeDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingOffice?._id ? 'Edit Office' : 'Create New Office'}
            </DialogTitle>
            <DialogDescription>
              {editingOffice?._id ? 'Update office information' : 'Add a new global office location'}
            </DialogDescription>
          </DialogHeader>
          
          {editingOffice && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="officeTitle">Office Title</Label>
                <Input
                  id="officeTitle"
                  value={editingOffice.title}
                  onChange={(e) => setEditingOffice({...editingOffice, title: e.target.value})}
                  placeholder="e.g., Headquarters - USA"
                />
              </div>

              <div>
                <Label htmlFor="officeAddress">Address</Label>
                <Textarea
                  id="officeAddress"
                  value={editingOffice.address}
                  onChange={(e) => setEditingOffice({...editingOffice, address: e.target.value})}
                  placeholder="Enter full address (use line breaks for formatting)"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="officePhone">Phone Number</Label>
                  <Input
                    id="officePhone"
                    value={editingOffice.phone}
                    onChange={(e) => setEditingOffice({...editingOffice, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="officeEmail">Email Address</Label>
                  <Input
                    id="officeEmail"
                    type="email"
                    value={editingOffice.email}
                    onChange={(e) => setEditingOffice({...editingOffice, email: e.target.value})}
                    placeholder="office@company.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="officeWorkingHours">Working Hours</Label>
                <Input
                  id="officeWorkingHours"
                  value={editingOffice.workingHours}
                  onChange={(e) => setEditingOffice({...editingOffice, workingHours: e.target.value})}
                  placeholder="Mon-Fri: 9:00 AM - 5:00 PM EST"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsOfficeDialogOpen(false);
                    setEditingOffice(null);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={editingOffice._id ? () => saveGlobalOffice(editingOffice) : createGlobalOffice}
                  disabled={saveLoading}
                >
                  {saveLoading ? (
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-1" />
                  )}
                  {editingOffice._id ? 'Update Office' : 'Create Office'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 