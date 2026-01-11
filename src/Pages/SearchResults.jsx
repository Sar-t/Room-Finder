import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../Components/SearchForm';
import Card from '../Components/Card';
import { supabase } from '../../Supabase/supabaseClient';
import ShowProperty from '../Components/ShowProperty';

const SearchResults = () => {
  const [params] = useSearchParams();
  const [results,setResults] = useState([]);
  const filters = {
    location: params.get("location") || "",
    fromPrice: params.get("fromPrice") || "",
    toPrice: params.get("toPrice") || "",
    property_type: params.get("property_type") || "",
    tenant_preference: params.get("tenant_preference") || ""
  }
  useEffect(() => {
    const fetchResults = async () => {
      let query = supabase
      .from("Room")
      .select(`
      *,
      owner (
        email,
        phone_no
      )
    `);



      if (filters.fromPrice) {
        query = query.gte("rent", Number(filters.fromPrice));
      }
      if (filters.toPrice) {
        query = query.lte("rent", Number(filters.toPrice));
      }
      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`);
      }
      if (filters.property_type) {
        query = query.eq("property_type", filters.property_type);
      }
      if (filters.tenant_preference) {
        query = query.eq("tenant_preference", filters.tenant_preference);
      }

      const { data } = await query;
      setResults(data || []);
    };
    fetchResults();
    console.log("results",results);
  }, [params]);    
  
  return (
    <div>
        <SearchForm defaultValues = {filters} />
        <ShowProperty properties={results} />
    </div>
  )
}

export default SearchResults
